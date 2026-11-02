import React, { useState } from "react";

// Calls netlify/functions/ask.mjs. The API key stays on the server; it is never in this file.
export default function Ask() {
  const [reply, setReply] = useState(null); // { ok, status, text, sample }
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    const question = new FormData(event.target).get("question");
    const res = await fetch("/api/ask", { method: "POST", body: JSON.stringify({ question }) });
    const body = res.ok ? await res.json() : { answer: await res.text() };
    setReply({ ok: res.ok, status: res.status, text: body.answer, sample: body.sample });
    setBusy(false);
  }

  return (
    <form className="ask" onSubmit={handleSubmit}>
      <label htmlFor="question" className="field-label">The email to read</label>
      <textarea id="question" name="question" required maxLength={2000} rows={4}
        placeholder="Paste the email here, up to 2,000 characters" />
      <button type="submit" disabled={busy}>{busy ? "Reading..." : "Get the gist"}</button>
      <div aria-live="polite" className="reply-slot">
        {reply?.ok && <p className="answer">{reply.text}</p>}
        {/* ask.mjs sets sample when OPENAI_API_KEY is missing: say so, and how to connect a real model. */}
        {reply?.sample && (
          <p className="note">
            Sample mode: no AI model is connected, so a simple rule picked these lines. Add OPENAI_API_KEY in Netlify
            environment variables to get real answers. The key stays on Netlify's servers.
          </p>
        )}
        {reply && !reply.ok && <p className="note">{reply.text}</p>}
      </div>
    </form>
  );
}
