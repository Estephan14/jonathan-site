# Jonathan Estephan — Personal Website

A simple, fast, single-page personal site. Its main job is to **introduce me and
make it easy to get in touch** (with job opportunities in mind), plus room to
showcase projects later.

Built with plain **HTML, CSS, and JavaScript** — no frameworks — so every line is
easy to read and learn from.

---

## 📁 Files in this project

| File          | Purpose                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| `index.html`  | The **structure / content** of the page (text, sections, links).        |
| `styles.css`  | The **look** — colours, fonts, layout, light/dark themes, mobile sizing.|
| `script.js`   | The **interactivity** — light/dark toggle + auto-updating footer year.  |
| `README.md`   | This file — explains the project.                                       |

> 💡 Each code file starts with a numbered "table of contents" comment, and the
> lines are explained inline. Read them top-to-bottom like a tutorial.

---

## 🧠 How the three files work together

Think of a web page like a person:

- **HTML** is the *skeleton* — it decides what exists (a heading, a button, a link).
- **CSS** is the *clothes & appearance* — it decides how those things look.
- **JavaScript** is the *behaviour* — it reacts when you click or interact.

The browser reads `index.html` first. Inside it, two lines connect the others:

```html
<link rel="stylesheet" href="styles.css" />  <!-- pulls in the styling -->
<script src="script.js"></script>            <!-- pulls in the behaviour -->
```

---

## 👀 How to view it on your computer

Just double-click `index.html` — it opens in your web browser. That's it.
(No server or installation needed because it's a plain static site.)

---

## ✏️ Common things you'll want to edit

| I want to change…              | Open this file | Look for…                              |
| ------------------------------ | -------------- | -------------------------------------- |
| The about / bio text           | `index.html`   | the `id="about"` section               |
| My tagline                     | `index.html`   | `class="hero-tagline"`                 |
| Add a real project             | `index.html`   | the `id="projects"` section (template inside the comments) |
| The accent (highlight) colour  | `styles.css`   | `--accent:` near the top               |
| Default light vs dark          | `script.js`    | `applyTheme(savedTheme || 'dark')`     |

---

## 🚀 Going live

This site is deployed with **Vercel**, connected to a **GitHub** repository.
Every time the code is pushed to GitHub, Vercel automatically publishes the
update — so the live link always shows the latest version.

---

## ✅ To-do / ideas for later

- [ ] Replace the "Coming soon" project card with the finished project.
- [ ] Add a real photo of myself to the hero section.
- [ ] (Optional) Point a custom domain (e.g. a `.me` or `.dev`) at the Vercel site.
