# Michael Peterson — Portfolio

Personal portfolio website built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**.

## Run locally

```bash
npm install       # first time only
npm run dev       # start dev server at http://localhost:3000
```

## Where to edit content

All text and project data lives in **one file**:

- [`app/lib/data.ts`](app/lib/data.ts) — your name, tagline, about text, contact
  links, projects, and skills.

Fields marked `// TODO(michael)` are drafts inferred from your GitHub repos —
review and replace them with real details.

### Adding a project screenshot

1. Put the image in `public/projects/` (e.g. `public/projects/wine.png`).
2. In `app/lib/data.ts`, set the project's `image` field, e.g.
   `image: "/projects/wine.png"`.

### Adding your resume

1. Put `resume.pdf` in the `public/` folder.
2. In `app/lib/data.ts`, set `resumeUrl: "/resume.pdf"`. A download button
   appears automatically.

## Structure

```
app/
  layout.tsx        # metadata / SEO, fonts
  page.tsx          # composes all sections
  globals.css       # theme tokens (colors, fonts)
  lib/data.ts       # ← all editable content
  components/       # Navbar, Hero, About, Projects, Skills, Contact, Footer
public/projects/    # ← project screenshots go here
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, and click
   **Add New → Project**.
3. Import the repo. Vercel auto-detects Next.js — no config needed. Click
   **Deploy**.
4. You'll get a free `*.vercel.app` URL. Add a custom domain later in
   Project → Settings → Domains.
```
