# StressPredict

A stress assessment web app. Built with React and Tailwind CSS.

The design we are building from is in [docs/prototype.png](docs/prototype.png).

## For team members (non-technical): start here

1. Read [docs/SETUP.md](docs/SETUP.md): one-time setup (about 15 minutes).
2. Read [docs/DAILY_WORKFLOW.md](docs/DAILY_WORKFLOW.md): how to save and share your work.
3. Read [docs/ADDING_A_PAGE.md](docs/ADDING_A_PAGE.md): how to build a page.

## The five pages

| Page | File | Address |
|------|------|---------|
| Home | `src/pages/Home.jsx` | `/` |
| Assessment | `src/pages/Assessment.jsx` | `/assessment` |
| Results | `src/pages/Results.jsx` | `/results` |
| Tips | `src/pages/Tips.jsx` | `/tips` |
| About | `src/pages/About.jsx` | `/about` |

The navbar and footer are already done and appear on every page. Each page currently shows a dashed "to be built" box. Replace that box with the real page.

## For the team lead: quick commands

```bash
npm install     # first time only
npm run dev     # start the app at http://localhost:5173
npm run build   # check that everything compiles
```

## Project map

```
src/
  pages/        <- ONE FILE PER PAGE. This is where the team works.
  components/   <- Navbar, Footer, Logo, Button, PageHeader, Placeholder
  index.css     <- Brand colors and font
templates/
  PageTemplate.jsx   <- Copy this to start a new page
docs/           <- Guides and the design prototype
```

## How pages work

Every file in `src/pages/` that has a `meta` line becomes a page and shows up in the menu automatically, in the order set by `order`. No routing code to edit.

## Tech

React 18, Vite, Tailwind CSS v4, React Router, lucide-react (icons).
