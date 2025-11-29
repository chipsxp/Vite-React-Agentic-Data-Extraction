# ADE Workflow, Data, and Schema

## Parse → Markdown → Extract Pipeline

- **Component:** `src/components/PdfExtractionWorkflow.tsx` owns the entire Landing.ai interaction cycle.
- **Upload stage:** Accepts PDFs through the native file input, stores the selected file in React state, and clears previous output/errors so each run starts clean.
- **Parse stage:** Sends `document` + `model=dpt-2-mini` to `/api/ade/parse` via `FormData`. The Vite dev server proxies this call to `https://api.va.landing.ai`, so no extra backend code is required for local demos.
- **Markdown stage:** Collapses the ADE `chunks` array into a single markdown string, trims empty segments, and shows the first ~1200 characters for quick inspection.
- **Extract stage:** Wraps the markdown in a `File`, pairs it with the JSON version of the Book schema, and posts to `/api/ade/extract`. ADE returns structured JSON that already matches the Zod schema, so the UI only needs minimal casting.
- **Result stage:** Stores the parsed object as a `Book`, surfaces key metadata, and keeps the entire response available for further UI expansion.

## Data Source (`books.json` + `src/data/books.ts`)

- `books.json` is the single source of truth for catalog entries. Each record mirrors the Zod `Book` contract and points to **real** assets under `public/Deep Machine Learning` (four PDFs and four PPTX slide decks).
- `src/data/books.ts` simply imports the JSON payload and exports it as a `BookDatabase`, guaranteeing that any consumer inside the React tree benefits from the schema-derived TypeScript types.
- Because the files live inside `public/`, Vite serves them verbatim, making the `pdfUrl` values stable even when offline.

## Schema Layer (`src/schema/books.ts`)

- **PublisherSchema / AvailabilitySchema / RatingSchema** break large nested objects into reusable chunks with descriptive metadata that ADE can leverage while extracting.
- **BookSchema** stitches together primitives and nested schemas, restricting numbers to reasonable ranges (e.g., positive page counts, rating averages between 0-5).
- **BookDatabaseSchema** enforces that `books.json` always exports an array of valid `Book` objects, catching mistakes early during development.
- Exported TypeScript types (`Book`, `BookDatabase`, etc.) keep the UI synchronized with schema changes without manual interface upkeep.

## Structural Decisions & Solutions

- **Consistent Typing:** Using Zod both for ADE extraction prompts and runtime validation keeps the schema definition single-sourced.
- **Local Assets for Reliability:** Storing the "Deep Machine Learning" documents inside `public/` eliminates the broken-link issues encountered with earlier Project Gutenberg URLs.
- **Proxy Configuration:** `vite.config.ts` forwards `/api/ade/*` routes to Landing.ai so the React app can call ADE securely without exposing credentials client-side (the SDK reads `VITE_VISION_AGENT_API_KEY`).
- **Progressive UX:** State-driven status indicators (`idle → parsing → extracting`) give clear feedback, while error boundaries catch everything from missing files to ADE server issues.

This document should help future contributors understand how the workflow, data layer, and schema collaborate to deliver trustworthy ADE demos.
