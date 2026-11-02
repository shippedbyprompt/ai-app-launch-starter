// Runs on Netlify's servers. Set OPENAI_API_KEY in Project configuration > Environment variables
// (no VITE_ prefix, so it never reaches the browser).
const INSTRUCTIONS =
  "You read one email and list only what it asks the reader to do, one short line each, with any date or deadline. " +
  "No greeting, no summary of the rest. If it asks nothing, say so in one line.";

// Without a key the demo still answers, using a plain rule instead of a model: keep sentences that ask for something.
function sampleGist(text) {
  const asks = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => /\b(please|could you|can you|needs? to|make sure|remember to|don't forget|by|before|deadline|due)\b/i.test(s));
  return asks.length ? asks.slice(0, 5).map((s) => `- ${s}`).join("\n") : "This email doesn't seem to ask you for anything.";
}

export default async (request) => {
  if (request.method !== "POST") return new Response("Use POST", { status: 405 });
  // Only answer calls from pages on this site, so other sites can't spend your key through it.
  const origin = request.headers.get("origin");
  if (!origin || new URL(origin).host !== new URL(request.url).host) return new Response("Calls from other sites are not allowed", { status: 403 });
  const { question } = await request.json().catch(() => ({}));
  if (!question || question.length > 2000) return new Response("Send a question under 2000 characters", { status: 400 });
  if (!process.env.OPENAI_API_KEY) return Response.json({ answer: sampleGist(question), sample: true });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      max_tokens: 400,
      messages: [{ role: "system", content: INSTRUCTIONS }, { role: "user", content: question }],
    }),
  });
  if (!res.ok) return new Response("The AI provider returned an error", { status: 502 });
  const data = await res.json();
  return Response.json({ answer: data.choices?.[0]?.message?.content ?? "" });
};

// Netlify blocks a visitor after 10 questions a minute (works on every plan; check the deploy log).
// Scripts can still fake the Origin header, so also set a monthly spend limit with your AI provider.
export const config = {
  path: "/api/ask",
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
