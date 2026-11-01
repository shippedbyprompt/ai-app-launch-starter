import React from "react";
import { CLASSES } from "./classes.js";
import Waitlist from "./Waitlist.jsx";
import Ask from "./Ask.jsx";
import Vessels from "./Vessels.jsx";

function Header() {
  return (
    <header className="top">
      <a href="/" className="brand">Clay with Maya</a>
      <nav><a href="/#classes">Classes</a><a href="/ask">Ask the studio</a></nav>
    </header>
  );
}

function ClassRow({ c }) {
  return (
    <li className="class">
      <div>
        <a className="class-title" href={`/classes/${c.slug}`}>{c.title}</a>
        <p className="class-when">{c.when}</p>
      </div>
      <p className="class-level">{c.level}</p>
      <p className="class-price">£{c.price}</p>
      <p className={c.seats ? "seats" : "seats full"}>{c.seats ? `${c.seats} places left` : "Full, join the waitlist"}</p>
    </li>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div>
          <h1>Make your first bowl in three Saturday mornings.</h1>
          <p>Six people, six wheels, one teacher. Clay, glazes and two firings included.</p>
          <a className="btn" href="#classes">See the classes</a>
        </div>
        <Vessels />
      </section>
      <section id="classes">
        <h2>Classes this season</h2>
        <ul className="classes">{CLASSES.map((c) => <ClassRow key={c.slug} c={c} />)}</ul>
      </section>
    </>
  );
}

function ClassPage({ slug }) {
  const c = CLASSES.find((x) => x.slug === slug);
  if (!c) return <section><h1>That class isn't on the schedule</h1><p><a href="/">See this season's classes</a></p></section>;
  return (
    <section className="detail">
      <a href="/#classes">All classes</a>
      <h1>{c.title}</h1>
      <p className="class-when">{c.when} · {c.level} · £{c.price}</p>
      <p className="lede">{c.blurb}</p>
      {c.seats ? (
        <p className="seats">{c.seats} places left. Book at the studio desk or by phone.</p>
      ) : (
        <>
          <p className="seats full">This class is full. Leave your email and you'll hear first if a place opens.</p>
          <Waitlist classSlug={c.slug} />
        </>
      )}
    </section>
  );
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const m = path.match(/^\/classes\/([a-z0-9-]+)$/);
  return (
    <>
      <Header />
      <main>
        {path === "/" ? <Home /> : m ? <ClassPage slug={m[1]} /> : path === "/ask" ? (
          <section className="detail"><h1>Ask the studio</h1><p className="lede">Questions about clay, firing times or what to wear. Answers come from an AI assistant.</p><Ask /></section>
        ) : (
          <section><h1>That page isn't here</h1><p><a href="/">Back to the classes</a></p></section>
        )}
      </main>
      <footer className="foot">A demo app for the <a href="https://shippedbyprompt.com/">Shipped by Prompt</a> guides. Not a real studio.</footer>
    </>
  );
}
