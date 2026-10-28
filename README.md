# StressPredict

A web app that helps people understand their stress level. Users answer a short questionnaire about their lifestyle and well-being, then see their result along with tips for managing stress.

> StressPredict is for informational purposes only. It is not a medical diagnosis.

Built with React, Vite and Tailwind CSS. The design we are building from is in [`docs/prototype.png`](docs/prototype.png).

---

## Pages

| Page | File | Address |
|------|------|---------|
| Home | `src/pages/Home.jsx` | `/` |
| Assessment | `src/pages/Assessment.jsx` | `/assessment` |
| Results | `src/pages/Results.jsx` | `/results` |
| Tips | `src/pages/Tips.jsx` | `/tips` |
| About | `src/pages/About.jsx` | `/about` |

The navbar and footer are already built and appear on every page. Every file in `src/pages/` that has a `meta` line becomes a page and shows up in the menu automatically. There is no routing code to edit.

---

## Getting started

### 1. Install these once

- [Node.js](https://nodejs.org) (choose the LTS version)
- [VS Code](https://code.visualstudio.com)
- [GitHub Desktop](https://desktop.github.com)

### 2. Get the project

1. Open GitHub Desktop and sign in.
2. Choose **File > Clone repository** and pick this repo.
3. Click **Open in Visual Studio Code**.

### 3. Run the app

Open the VS Code terminal (**Terminal > New Terminal**) and run:

```
npm install
npm run dev
```

Open the `localhost` link it prints. Changes show in the browser as soon as you save a file. Press **Ctrl + C** in the terminal to stop the app.

Next time, you only need `npm run dev`.

---

## Branches

| Branch | Purpose |
|--------|---------|
| `main` | The final, released version. Only the team lead merges into it. |
| `dev` | Where all work comes together and is tested before release. |
| your own branch | Where you do your work, created from `dev`. |

**Never work directly on `main` or `dev`.**

### Daily workflow

1. In GitHub Desktop, set **Current Branch** to `dev`, then click **Fetch origin** and **Pull origin**.
2. Create your own branch from `dev`: **Current Branch > New Branch**. Name it with your name and the task, with no spaces, e.g. `ama-assessment-page`.
3. Edit files in VS Code and save them. Check the result in the browser.
4. In GitHub Desktop, write a short summary and click **Commit**. Commit often.
5. Click **Publish branch** (first time) or **Push origin**.
6. Click **Create Pull Request** and make sure it targets **`dev`**.
7. Tell the team lead it is ready for review.

### If something goes wrong

- **Red error in the terminal:** press Ctrl + C, then run `npm run dev` again.
- **Blank page:** look for a typo in the file you last edited, such as a missing `<`, `>` or `}`.
- **Merge conflict in GitHub Desktop:** don't try to fix it. Message the team lead.
- Nothing you do on your own branch can break the app.

### Releasing (team lead)

When `dev` is tested and ready, open a pull request on GitHub with **base: `main`** and **compare: `dev`**, then review and merge it.

---

## Building a page

Open the file for your page in `src/pages/`, delete the dashed "to be built" box, and build the page from `docs/prototype.png`.

To add a brand new page:

1. Copy `templates/PageTemplate.jsx` into `src/pages/` and rename it, e.g. `Contact.jsx`.
2. Change the three lines marked `CHANGE ME`.
3. Save. The page appears in the menu.

### Styling

Style things by adding words to `className`:

| You want | Add |
|----------|-----|
| Bigger text | `text-xl` or `text-2xl` |
| Bold | `font-bold` |
| Space inside / outside | `p-4` / `m-4` |
| White card | `bg-white rounded-xl p-5` |
| Brand blue background | `bg-brand-50` |
| Brand blue text | `text-brand-600` |
| Soft grey text | `text-navy/70` |

Tailwind reference: https://tailwindcss.com/docs

Icons come from [lucide](https://lucide.dev/icons):

```jsx
import { Moon } from "lucide-react";

<Moon className="size-6 text-brand-600" />
```

Brand colors and the font are defined in `src/index.css`. See `docs/ADDING_A_PAGE.md` for more examples.

---

## Project structure

```
src/
  pages/        One file per page. This is where the team works.
  components/   Navbar, Footer, Logo, Button, PageHeader, Placeholder
  index.css     Brand colors and font
templates/
  PageTemplate.jsx   Copy this to start a new page
docs/           Guides and the design prototype
```

## Commands

| Command | What it does |
|---------|--------------|
| `npm install` | Installs dependencies (first time only) |
| `npm run dev` | Starts the app at `http://localhost:5173` |
| `npm run build` | Checks that everything compiles |
| `npm run preview` | Previews the built app |

## Tech

React 18, Vite, Tailwind CSS v4, React Router, lucide-react.
