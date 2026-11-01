import React, { useState } from "react";

// Calls netlify/functions/ask.mjs. The API key stays on the server; it is never in this file.
export default function Ask() {
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    const question = new FormData(event.target).get("question");
    const res = await fetch("/.netlify/functions/ask", { method: "POST", body: JSON.stringify({ question }) });
    setAnswer(res.ok ? (await res.json()).answer : await res.text());
    setBusy(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="question" required maxLength={2000} placeholder="Ask something" aria-label="Question" />
      <button type="submit" disabled={busy}>{busy ? "Asking..." : "Ask"}</button>
      {answer && <p className="answer">{answer}</p>}
    </form>
  );
}
