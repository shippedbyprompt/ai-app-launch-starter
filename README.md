# Clay with Maya (demo on the AI app launch starter)

A made-up pottery studio, not a real business. It shows what the [AI app launch starter](https://github.com/shippedbyprompt/ai-app-launch-starter) looks like after an app is built on top of it: a class list, a waitlist and an "ask about clay" box.

Compare it with the starter to see exactly what was added: [main...demo/clay-with-maya](https://github.com/shippedbyprompt/ai-app-launch-starter/compare/main...demo/clay-with-maya). The three launch fixes (`public/_redirects`, the Netlify form, `netlify/functions/ask.mjs`) are the starter's, unchanged.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/shippedbyprompt/ai-app-launch-starter&branch=demo/clay-with-maya)

After deploying: submit the waitlist once and check the Forms tab; add `OPENAI_API_KEY` under Project configuration > Environment variables, then redeploy.

MIT licensed.
