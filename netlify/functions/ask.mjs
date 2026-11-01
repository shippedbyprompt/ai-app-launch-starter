// Runs on Netlify's servers. Set OPENAI_API_KEY in Project configuration > Environment variables
// (no VITE_ prefix, so it never reaches the browser).
export default async (request) => {
  if (request.method !== "POST") return new Response("Use POST", { status: 405 });
  const { question } = await request.json().catch(() => ({}));
  if (!question || question.length > 2000) return new Response("Send a question under 2000 characters", { status: 400 });
  if (!process.env.OPENAI_API_KEY) return new Response("Add OPENAI_API_KEY in Netlify environment variables, then redeploy", { status: 500 });

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: question }] }),
  });
  if (!res.ok) return new Response("The AI provider returned an error", { status: 502 });
  const data = await res.json();
  return Response.json({ answer: data.choices?.[0]?.message?.content ?? "" });
};
