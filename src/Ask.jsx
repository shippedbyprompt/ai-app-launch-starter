import React, { useState } from "react";

// Calls netlify/functions/ask.mjs. The API key stays on the server; it is never in this file.
export default function Ask() {
  const [reply, setReply] = useState(null); // { ok, status, text }
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    const question = new FormData(event.target).get("question");
    const res = await fetch("/api/ask", { method: "POST", body: JSON.stringify({ question }) });
    setReply({ ok: res.ok, status: res.status, text: res.ok ? (await res.json()).answer : await res.text() });
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
        {/* ask.mjs answers 500 only when OPENAI_API_KEY is missing: show it as a setup step, not an error. */}
        {reply && !reply.ok && reply.status === 500 && (
          <div className="setup">
            <p className="setup-title">No AI model connected yet</p>
            <p>{reply.text}. The key stays on Netlify's servers and never reaches this page.</p>
          </div>
        )}
        {reply && !reply.ok && reply.status !== 500 && <p className="note">{reply.text}</p>}
      </div>
    </form>
  );
}
