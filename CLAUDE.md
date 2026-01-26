# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

This is a digital children's book website created by a father for his children. The stories are primarily written by the kids, with the father's sense of humor sprinkled in. Development should prioritize fun and whimsy, always focusing on play and showcasing the children's creativity.

## Build Commands

```bash
npm run dev      # Start dev server with TinaCMS (tinacms dev -c "vite dev")
npm run build    # Build for production (tinacms build && vite build)
npm run start    # Run production server (node dist/server/server.js)
```

To access the dev server from other devices on the local network (e.g., iPad via Blink Shell):
```bash
npx tinacms dev -c "vite dev --host"    # Exposes dev server on local network
```

Node.js 22.x required (see .nvmrc).

## Architecture

Tech stack:
- **TanStack Start** - Full-stack React framework with SSR and file-based routing
- **TinaCMS** - Headless CMS for MDX chapter content
- **Vite + Nitro** - Build tooling and server-side rendering
- **Tailwind CSS** - Styling

### Key Directories

- `src/routes/` - TanStack file-based routes (dynamic routes use `$param` syntax)
- `src/content/chapters/` - MDX chapter files with frontmatter (title, synopsis)
- `tina/config.ts` - TinaCMS schema defining chapter collection
- `tina/__generated__/` - Auto-generated TinaCMS client (don't edit)

### Data Flow

1. Content authored as MDX in `src/content/chapters/`
2. TinaCMS generates typed client from schema
3. Routes use `createServerFn` to fetch content via TinaCMS client
4. `TinaMarkdown` renders MDX with custom components

### Route Pattern

```typescript
const getData = createServerFn({ method: "GET" })
  .handler(async () => {
    const data = await client.queries.chapterConnection();
    return data;
  });

export const Route = createFileRoute("/path")({
  loader: () => getData(),
  component: PageComponent,
});
```

### Custom MDX Components

Chapters support an `<Illustration>` component with `src`, `alt`, and `float` (left/right) props. Custom paragraph styling includes drop caps on first letter and justified text.

## Environment Variables

For TinaCMS cloud (production):
- `CLIENT_ID` - TinaCMS client ID
- `CONTENT_TOKEN` - TinaCMS content token

## Deployment

Deployed to Vercel with Nitro server preset (see `app.config.ts`).
