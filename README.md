# The Lakehouse Stories

A digital children's book about the animals who live in the forest around the lakehouse. Stories written by the kids, with dad's sense of humor sprinkled in.

## Getting Started

```bash
nvm use           # Use Node.js 22.x
npm install       # Install dependencies
npm run dev       # Start development server
```

Open [http://localhost:3000](http://localhost:3000) to read the stories.

## Tech Stack

- [TanStack Start](https://tanstack.com/start) - Full-stack React framework
- [TinaCMS](https://tina.io/) - Headless CMS for MDX content
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## Adding Content

Chapters are MDX files in `src/content/chapters/`. Run `npm run dev` and visit `/admin` to use the TinaCMS visual editor.
