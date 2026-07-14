# CLAUDE.md

Instructions for Claude Code when working in this repository.

## Project

Capstone for the FlyRank AI-assisted development track. Two deliverables live here:

- `website/` — my personal brand site: a single, fast, accessible page engineered
  to be readable by AI answer engines (AEO/GEO).
- `agent/` — a personal + research assistant: a Python CLI agent with a real
  tool-use loop (web search, notes, tasks).

## About me

Zahra Arshad — front-end developer. My focus is accessible, performant interfaces
with clean semantic markup.

## Stack

**Website**
- Plain HTML, CSS, and vanilla JavaScript — no framework, no build step
- Deployed as static files
- schema.org JSON-LD for structured data

**Agent**
- Python 3
- `anthropic` SDK, Messages API with tool use
- No agent framework — the loop is written by hand on purpose

## Conventions

**Commits** — Conventional Commits 1.0.0: `type(scope): description`
- Types I use: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`
- Description in lowercase, imperative mood, no trailing period
- Example: `feat(agent): add web search tool`

**HTML/CSS/JS**
- Semantic HTML5 elements — never a `<div>` where a real element exists
- Keep the heading hierarchy correct and unbroken (one `<h1>`, no skipped levels)
- Accessibility is not optional: visible keyboard focus, alt text, colour contrast,
  and `prefers-reduced-motion` respected
- CSS custom properties for colour and spacing tokens; no inline styles
- Vanilla JS only on the website — do not add a framework or dependency without asking

**Python**
- Standard library first; add a dependency only when it earns its place
- Clear names over clever ones
- Never commit secrets — API keys go in `.env`, which is gitignored

**Structured data**
- The visible FAQ copy and the `FAQPage` JSON-LD must always say the same thing.
  If you change one, change the other.

## Working with me

- Explain what you changed and why — I need to defend every line in a review.
- Prefer small, reviewable diffs over large rewrites.
- Ask before adding a dependency, a build step, or a framework.
- If something in this file is wrong or out of date, say so.
