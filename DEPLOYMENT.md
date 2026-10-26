# AI Assessment Generator – Production Deployment

This version is configured for both Vercel and Render with TanStack Start + Nitro and Google Gemini's OpenAI-compatible API.

## Environment variables

Set these in the hosting provider dashboard. Never commit `.env` or put the API key in a `VITE_` variable.

```text
AI_API_KEY=your Gemini API key
AI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
AI_MODEL=gemini-3.8-flash
```

Google currently documents `gemini-3.8-flash` as a stable Gemini Flash model and documents the OpenAI-compatible endpoint above.

## Vercel

1. Import this repository into Vercel.
2. Keep the project root at the repository root.
3. Vercel should detect TanStack Start.
4. Add `AI_API_KEY`, `AI_BASE_URL`, and `AI_MODEL` under Project Settings → Environment Variables.
5. Redeploy after saving the variables.

The repository contains `vercel.json` and Nitro is enabled in `vite.config.ts`.

## Render

Use a Node web service or the included `render.yaml` Blueprint.

Build command:

```text
npm install && npm run build
```

Start command:

```text
npm start
```

Set `AI_API_KEY` in Render's Environment settings. The Blueprint sets the Gemini endpoint/model and the Render Nitro preset.

## Important

Do not use:

```text
VITE_AI_API_KEY
```

Use:

```text
AI_API_KEY
```

The AI request is performed by server-side code so the Gemini key is not bundled into browser JavaScript.

## Important Vercel security dependency update

Vercel blocks vulnerable TanStack Start versions affected by CVE-2026-102989. This project is pinned to `@tanstack/react-start@1.168.60` and overrides `@tanstack/start-server-core` to `1.169.39`, which are patched versions. Do not set `DANGEROUSLY_DEPLOY_VULNERABLE_TANSTACK_START_XSS=1`.


## Render dependency compatibility fix
- @tanstack/react-start: 1.168.60
- @tanstack/start-server-core override: 1.169.39
- @tanstack/router-plugin: 1.168.42
- @tanstack/react-router: 1.170.41 (satisfies router-plugin peer requirement)
- Render Build Command: `npm install && npm run build`
- Render Start Command: `npm start`
- Do not use `--force`, `--legacy-peer-deps`, or the vulnerable TanStack bypass flag.


## AI analysis latency fix

Gemini 3.8 Flash defaults to medium reasoning. The production AI calls use low reasoning, bounded output sizes, a 75-second request timeout, and limited retries so a single slow model call does not keep a Vercel/Render request open indefinitely. Gemini 3.8 Flash supports low/medium/high thinking levels and OpenAI-compatible `reasoning_effort`.
