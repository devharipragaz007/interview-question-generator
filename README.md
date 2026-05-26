# Interview Question Generator

A minimal React app that generates 3 tailored interview questions for any job title using Google Gemini AI.

## What it does

Enter a job title (e.g. "Customer Success Manager", "Senior Backend Engineer") and the app calls the Gemini API to return 3 role-specific interview questions, each targeting a different core competency.

## Tech stack

- **React 19** — UI
- **Vite 8** — dev server and build tool
- **Tailwind CSS v4** — styling (via the `@tailwindcss/vite` plugin)
- **Google Gemini API** — question generation (`gemini-2.5-flash` by default)

## Project structure

```
src/
├── api/
│   └── gemini.js        # Gemini API call and response parsing
├── components/
│   ├── QuestionCard.jsx # Renders a single question
│   └── Spinner.jsx      # Loading indicator
├── App.jsx              # Main form, state, and layout
├── index.css            # Tailwind import + CSS custom properties
└── main.jsx             # React entry point
```

## Getting started

### Prerequisites

- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/) API key

### Setup

1. Clone the repo and install dependencies:

   ```bash
   git clone <repo-url>
   cd interview-question-generator
   npm install
   ```

2. Copy the env example and add your API key:

   ```bash
   cp .env.example .env
   ```

   Open `.env` and fill in your key:

   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   VITE_GEMINI_MODEL=gemini-2.5-flash
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   The app runs at `http://localhost:5173`.

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## How the Gemini integration works

[src/api/gemini.js](src/api/gemini.js) sends a prompt to the Gemini REST API that asks for exactly 3 questions in a JSON array. The response text is stripped of any markdown code fences and parsed with `JSON.parse`. If the API returns a non-200 status or an unexpected format, an error is thrown and shown in the UI.

The model and API key are read from Vite environment variables (`VITE_GEMINI_MODEL`, `VITE_GEMINI_API_KEY`), so they are never hardcoded.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `VITE_GEMINI_API_KEY` | Yes | Your Google AI Studio API key |
| `VITE_GEMINI_MODEL` | Yes | Gemini model to use (e.g. `gemini-2.5-flash`) |

> **Note:** Vite exposes all `VITE_` prefixed variables to the browser bundle. Do not put secrets here that should remain server-side.
