import React from "react";
import Waitlist from "./Waitlist.jsx";
import Ask from "./Ask.jsx";

export default function App() {
  const path = window.location.pathname;
  return (
    <main>
      <nav>
        <a href="/">Home</a> <a href="/deep/link">A deep link</a>
      </nav>
      {path === "/" ? (
        <>
          <h1>Your app is live on Netlify</h1>
          <p>Replace this page with the app from your AI builder. The three parts below already work.</p>
          <h2>1. Join the waitlist</h2>
          <Waitlist />
          <h2>2. Ask an AI model without exposing your key</h2>
          <Ask />
        </>
      ) : (
        <>
          <h1>Deep link: {path}</h1>
          <p>Press refresh. You stay here instead of seeing "Page not found", because of public/_redirects.</p>
        </>
      )}
    </main>
  );
}
