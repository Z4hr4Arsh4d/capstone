# Capstone — Zahra Arshad

My capstone for the FlyRank AI-assisted development track.

I'm a front-end developer. The theme running through both deliverables is the same
one I care about in my day-to-day work: build for the reader, human or machine.
Semantic markup, accessibility, and performance are what make a page good — and
they're also what make it readable by AI answer engines.

## Status

Early scaffold. `website/` and `agent/` are planned but not yet implemented — see [`CLAUDE.md`](./CLAUDE.md) for the intended stack and conventions.

## What's in here

### `website/`

A single-page personal site, built with plain HTML, CSS, and vanilla JavaScript —
no framework, no build step. It's engineered as a live case study in answer-engine
optimization (AEO): semantic HTML5, `Person` + `WebSite` + `FAQPage` JSON-LD,
full meta tags, plus `llms.txt`, `robots.txt`, and `sitemap.xml`.

### `agent/`

A personal + research assistant: a Python CLI agent with a real tool-use loop and
no agent framework, so every line is mine to explain. It can search the web to
research a topic, and it keeps my notes and task list in local files. It combines
a server tool (`web_search`, run by Anthropic) with client tools (notes and tasks,
written by me).

## Stack

- **Website** — HTML, CSS, JavaScript, schema.org JSON-LD
- **Agent** — Python 3, Anthropic Messages API with tool use

## Conventions

Commits follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/).
Project conventions for AI assistants are documented in [`CLAUDE.md`](./CLAUDE.md).

## License

[MIT](./LICENSE)
