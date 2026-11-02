import React from "react";
import Waitlist from "./Waitlist.jsx";
import Ask from "./Ask.jsx";

const README = "https://github.com/shippedbyprompt/ai-app-launch-starter#readme";

// Sample content. Replace with your own app; the three working parts are Waitlist, Ask and public/_redirects.
const examples = [
  {
    from: "Building management",
    subject: "Updated access arrangements for the east stairwell, parking and deliveries",
    asks: ["Move your car out of bay 14 before Monday 8am", "Collect the new fob from reception by Friday", "Reply only if you need a disabled-access bay"],
  },
  {
    from: "Mara, school office",
    subject: "Re: Re: Fwd: spring trip, consent and a few other things",
    asks: ["Sign the consent form and send it back by the 12th", "Pay the €18 deposit on the parent portal", "Pack a lunch; the café is closed that day"],
  },
];

function Specimen() {
  return (
    <figure className="specimen" aria-label="Example: a long email and its gist">
      <div className="email">
        <p className="email-meta">From: Priya at Northfield Lettings</p>
        <p>
          Hi Sam, hope the move-in went smoothly and you are settling into the flat. A few housekeeping items as we
          approach the end of the first quarter, most of which you can ignore. <mark>Could you send a photo of the
          meter reading before the 30th</mark> so we can close the previous tenant's account. The boiler service is
          booked for the week of the 4th; the engineer will call ahead, and <mark>someone needs to be home on Tuesday
          morning</mark>. On the deposit, everything is registered with the scheme, nothing needed there. Lastly,{" "}
          <mark>please confirm whether you want to renew in March</mark>, as we start advertising otherwise.
        </p>
      </div>
      <figcaption className="gist">
        <p className="gist-title">The gist</p>
        <ul>
          <li>Send a meter photo by the 30th</li>
          <li>Be home Tuesday morning</li>
          <li>Say yes or no to the March renewal</li>
        </ul>
      </figcaption>
    </figure>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>Paste a long email. Get what it wants from you.</h1>
          <p className="lede">
            Gist reads the whole thread and gives back only the things you have to do, with dates. Everything else
            can wait.
          </p>
          <Ask />
        </div>
        <Specimen />
      </section>

      <section className="pro" id="pro">
        <div>
          <h2>Gist Pro is coming</h2>
          <p>Whole threads, a forwarding address for your inbox, and a weekly list of what you still owe people.</p>
        </div>
        <Waitlist />
      </section>
    </>
  );
}

function NotFound() {
  return (
    <section className="examples">
      <h1>Page not found</h1>
      <p className="lede">Gist has no page at this address. <a href="/">Go back to Try it</a>.</p>
      <p className="route-note">
        This is the app's own page for an address that doesn't exist. Netlify's "Page not found" error never shows,
        because <code>public/_redirects</code> hands every address to the app, and the app decides what to show.
      </p>
    </section>
  );
}

function Examples({ path }) {
  return (
    <section className="examples">
      <h1>Examples</h1>
      <p className="lede">Two real-looking emails and the gist of each.</p>
      <div className="example-list">
        {examples.map((e) => (
          <article key={e.subject} className="example">
            <p className="email-meta">{e.from}</p>
            <h2>{e.subject}</h2>
            <ul>{e.asks.map((a) => <li key={a}>{a}</li>)}</ul>
          </article>
        ))}
      </div>
      <p className="route-note">
        You opened <code>{path}</code> directly. Refresh the page: it stays here instead of showing "Page not found",
        because <code>public/_redirects</code> serves the app for every route.
      </p>
    </section>
  );
}

export default function App() {
  const path = window.location.pathname;
  const home = path === "/";
  const onExamples = path.replace(/\/$/, "") === "/examples";
  return (
    <>
      <p className="starter-bar">
        A sample app from the AI app launch starter. <a href={README}>Read the README</a> to swap in your own.
      </p>
      <header className="site-header">
        <a href="/" className="wordmark">Gist</a>
        <nav aria-label="Main">
          <a href="/" aria-current={home ? "page" : undefined}>Try it</a>
          <a href="/examples" aria-current={onExamples ? "page" : undefined}>Examples</a>
        </nav>
      </header>
      <main>{home ? <Home /> : onExamples ? <Examples path={path} /> : <NotFound />}</main>
      <footer className="site-footer">
        <p>Gist is a made-up product. The routes and the waitlist run on Netlify; the AI box answers in sample mode until you add your own key.</p>
      </footer>
    </>
  );
}
