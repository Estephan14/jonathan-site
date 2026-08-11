# Jonathan Estephan — Personal Website

A fast, single-page personal site: an introduction, a way to get in touch, and a
showcase of what I've built. Aimed at **Developer Advocate** roles.

- **Live:** https://jonathanestephan.com
- **Repo:** https://github.com/Estephan14/jonathan-site (public)
- **Hosting:** Vercel — every push to `main` auto-deploys.

Plain **HTML, CSS, and JavaScript**. No framework, no build step, no
dependencies. Every file starts with a numbered table-of-contents comment and is
explained inline, so it can be read top-to-bottom like a tutorial.

---

## ⚠️ Read this before editing

**The local clone goes stale.** On 2026-08-11 it was five commits behind the
remote, and an edit made against it would have added a duplicate project card.

```bash
git fetch origin && git status
```

Do that **first**, every time. If it says you're behind, `git pull` before
touching anything. Never assume the local `index.html` shows what's actually on
the live site.

---

## 📁 Files

| File | Purpose |
| ---- | ------- |
| `index.html` | The whole site — structure and content. |
| `styles.css` | All the looks: colours, layout, light/dark themes, mobile, and a print stylesheet. |
| `script.js` | The behaviour (see below). |
| `workshop.html` | "The Workshop" — a hub page for the projects. Linked from the hero. |
| `LETTER.html` / `LETTER.md` | A cover letter, as a standalone page. |
| `weaviate-challenge.html` + `.pdf` | The Weaviate Developer Advocate intern challenge submission. |
| `me.jpeg` | The hero photo and header avatar. |
| `favicon-avatar.png`, `favicon.svg` | Tab icons. |
| `logos/` | Company logos used in the Experience timeline. |

### What `script.js` does

1. **Light/dark toggle** — remembers the choice in `localStorage`, defaults to dark.
2. **Header logo swap** — "JE" initials cross-fade into the photo once you scroll
   past the hero (driven by an `IntersectionObserver`).
3. **Scroll reveal** — sections fade in as they enter the viewport.
4. **Cursor sheen** — a faint glow follows the pointer across cards. Disabled on
   touch devices and when `prefers-reduced-motion` is set.
5. **Active nav highlighting** — the current section lights up in the top nav and
   the mobile dock.
6. **Footer year** — set automatically, so it never goes stale.

### Page sections, in order

`hero` → `value` → `about` → `experience` → `projects` → `speaking` →
`education` → `skills` → `contact`

**Printing (Ctrl/Cmd+P) produces a clean one-page CV.** `styles.css` has a large
print section that hides the hero, nav, and decoration, and reflows Experience,
Projects, Education, and Skills onto paper. **If you add a section, check the
print view too** — it will otherwise inherit screen styling and look wrong.

---

## ✏️ Common edits

| I want to change… | File | Look for… |
| ----------------- | ---- | --------- |
| Bio / about text | `index.html` | `id="about"` |
| Tagline | `index.html` | `class="hero-tagline"` |
| Add a project | `index.html` | `id="projects"` — copy an `<article class="project-card card">` |
| Accent colour | `styles.css` | `--accent:` in `:root` (and `html.light`) |
| Default theme | `script.js` | `applyTheme(savedTheme || 'dark')` |
| Print/CV layout | `styles.css` | section 12, `@media print` |

### Adding a project card

Copy an existing `<article class="project-card card">` inside `.project-grid`.
The tag line is `Live · 2026`, `Built · 2026`, `Published · 2026`, or
`In progress · 2026`. A card can hold more than one `<a class="project-link">`.

### The linked pair pattern

Jarvis and Discipline are **one system**, so they're shown as a pair rather than
two unrelated cards: a `.project-pair` wrapper that spans the full grid row
(`grid-column: 1 / -1`), holding a two-column `.project-pair-cards` grid, with a
captioned hairline underneath. It collapses to one column below 640px.

Reuse it if two projects genuinely belong together — otherwise a normal card is
the right call.

---

## 🚀 Deploying

```bash
git fetch origin        # ALWAYS first
git add -A
git commit -m "..."
git push origin main    # Vercel picks it up automatically
```

There is nothing to build and no tests. To preview, just open `index.html` in a
browser — it's a static file.

---

## 🗂️ Project index

Everything I've built, what state it's in, and where it lives. **Check here
before proposing a "new" project — several ideas that sound fresh are already
done.**

### On the site

| Project | What it is | Live | Code | Local |
| ------- | ---------- | ---- | ---- | ----- |
| **Pinocchio Bench** | A benchmark for AI agents that lie. 9 models × 10 scenarios × 3 trials = 270 episodes against mock tools, recording what each model *called* vs. what it *claimed*. Ranked by fabrication rate, ascending. | [/bench](https://jarvis-seven-ruddy.vercel.app/bench) | [pinocchio-bench](https://github.com/Estephan14/pinocchio-bench) (public) | `Desktop/Code/pinocchio-bench` |
| **Sermon Search** | Semantic search over 850+ talks — OpenAI embeddings, sentence-aligned chunking, LanceDB vector store, deep-links to the exact second on YouTube. **This is the RAG project.** | [/sermons](https://jarvis-seven-ruddy.vercel.app/sermons) | [mosaik-sermon-search](https://github.com/Estephan14/mosaik-sermon-search) (public) | `Desktop/Code/mosaik-sermon-search` |
| **Jarvis** | Voice assistant — hands-free speech in and out, a reasoning brain with memory, live web search, and tools (weather, news, calendar, music, reminders), plus a coding agent. | [demo](https://jarvis-seven-ruddy.vercel.app/demo.html) | `jarvis` (private) | `Desktop/Code/Jarvis` |
| **Discipline** | Daily habit tracker (PWA). Streaks, either/or tasks, and sick days that excuse only *physical* work. Its rules live inside Jarvis, so tasks are voice-controlled. | [demo](https://discipline-app-lac.vercel.app/demo.html) | `Discipline-App` (private) | `C:/Users/HP/Discipline-App` |
| **Mark I HUD** | An Iron Man-style heads-up display in the browser. | [/hud](https://jarvis-seven-ruddy.vercel.app/hud) | in the Jarvis repo (`hud.html`) | `Desktop/Code/Jarvis` |
| **Headcar** | A 4WD rover steered by Muse 2 EEG brain activity through an ESP32. | — | [TejasQ/headcar](https://github.com/TejasQ/headcar) | `Desktop/Code/Tejas/headcar` |
| **Calculator** | Command-line Python calculator — a fundamentals exercise. | — | — | — |

### Built but not on the site

| Project | What it is | Code |
| ------- | ---------- | ---- |
| **agent-tripwire** | The *fix* that came out of Pinocchio Bench: a before/after ground-truth check that catches an agent claiming an action it never performed. Shipped to production twice. | [agent-tripwire](https://github.com/Estephan14/agent-tripwire) (public) — `Desktop/Code/agent-tripwire` |

> **Worth doing:** Pinocchio Bench *measures* the problem and agent-tripwire
> *fixes* it. Told together — "I found a failure mode, quantified it, then
> shipped the guard" — that's a stronger story than either alone, and only half
> of it is currently visible.

### Notes on the demo pattern

Jarvis and Discipline are both password-gated, which makes a raw link useless to
a stranger. Both solve it the same way: a `demo.html` that runs the **real app**
with its network calls stubbed out. Discipline's `demo-data.js` replaces
`window.fetch`, so `app.js` is used completely unmodified and the demo can never
drift out of sync with the real thing.

**Use this pattern for any future gated project** — never a screenshot, and never
a forked copy of the app.

---

## ✅ To-do

- [ ] Add **agent-tripwire** to the site, ideally paired with Pinocchio Bench.
- [ ] Re-run Pinocchio Bench on current models — the numbers are from 2026-07-11
      and the page says so, but fresher is better.
- [ ] Export/backup button for the Discipline app (still owed).
- [ ] Decide whether `workshop.html` should be linked more prominently or folded
      into the main projects section.
