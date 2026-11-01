# AI app launch starter

A small Vite + React app with the three things AI-built apps most often get wrong on Netlify, already working:

1. **Refresh and deep links work.** `public/_redirects` (and `netlify.toml`) serve `index.html` for every route, so `/dashboard` never shows "Page not found". [Why](https://shippedbyprompt.com/guides/ai-builder-to-netlify/)
2. **A waitlist form that actually arrives.** Netlify Forms with a hidden static copy in `index.html` and a URL-encoded post from React. [Why](https://shippedbyprompt.com/guides/netlify-forms-in-react/)
3. **An AI feature without exposing the key.** `netlify/functions/ask.mjs` calls the model on the server and reads `OPENAI_API_KEY` from Netlify's environment variables. [Why](https://shippedbyprompt.com/guides/keep-api-keys-safe/)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/shippedbyprompt/ai-app-launch-starter)

## Use it with your own app

Copy these files into the repository your AI builder created:

| File | What it does |
|---|---|
| `public/_redirects` | Single-page app rewrite |
| `netlify.toml` | Build command, publish directory, the same rewrite |
| the hidden `<form>` in `index.html` + `src/Waitlist.jsx` | Netlify Forms in React |
| `netlify/functions/ask.mjs` + `src/Ask.jsx` | Server-side API key |

Or paste this into Lovable or Bolt: "Add a file public/_redirects containing /* /index.html 200."

## After deploying

- **Forms:** submit the waitlist once on the live site, then open your project's Forms tab on Netlify.
- **AI feature:** add `OPENAI_API_KEY` under Project configuration > Environment variables (no `VITE_` prefix), then redeploy.

## Run locally

```
npm install
npm run dev
```

Forms and functions run on Netlify; to try them locally use `netlify dev` from the Netlify CLI.

MIT licensed.
