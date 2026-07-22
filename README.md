# colleenmccann.net

Source for Colleen McCann's site — long-form research, short-form insights, and a media archive.

## Structure

- `/` — the public site (Astro, static-generated, deployed to Cloudflare Workers)
- `/studio` — the Sanity Studio content editor (deployed separately at [colleenmccann-net.sanity.studio](https://colleenmccann-net.sanity.studio))
- `/scripts` — one-time content-import tooling used to seed the launch content

## Content editing

Routine content changes (new Research, Insights, or Media entries; editing the About bio or Contact details) happen entirely in the [Sanity Studio](https://colleenmccann-net.sanity.studio) — no code or GitHub access needed. Publishing there triggers an automatic site rebuild.

## Local development

```sh
npm install
npm run dev       # site at localhost:4321
```

```sh
cd studio
npm install
npm run dev       # studio at localhost:3333
```

## Commands

| Command | Action |
| :--- | :--- |
| `npm run dev` | Start the site's local dev server |
| `npm run build` | Build the site to `./dist/` |
| `npm run preview` | Preview the production build locally |
