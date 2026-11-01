import React, { useState } from "react";

// Posts to Netlify Forms. The form name and fields must match the hidden form in index.html.
export default function Waitlist({ classSlug }) {
  const [status, setStatus] = useState("idle");

  async function handleSubmit(event) {
    event.preventDefault();
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(event.target)).toString(),
    });
    setStatus(res.ok ? "done" : "error");
  }

  if (status === "done") return <p className="done">You're on the waitlist. We'll email you if a place opens.</p>;
  return (
    <form name="waitlist" className="row" onSubmit={handleSubmit}>
      <input type="hidden" name="form-name" value="waitlist" />
      <input type="hidden" name="class" value={classSlug} />
      <p hidden><input name="bot-field" /></p>
      <input type="email" name="email" required placeholder="you@example.com" aria-label="Email" />
      <button type="submit">Join the waitlist</button>
      {status === "error" && <p>That didn't go through. Try again in a minute.</p>}
    </form>
  );
}
