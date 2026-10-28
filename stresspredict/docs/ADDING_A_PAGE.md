# Building and adding pages

A page is one file. The five pages (Home, Assessment, Results, Tips, About) already exist as files in `src/pages/`. Open yours, delete the dashed "to be built" box, and build the page from `docs/prototype.png`.

To add a brand new page, follow the steps below.

## Steps

1. In VS Code, open `templates/PageTemplate.jsx`.
2. Copy all of it.
3. Right-click the `src/pages` folder, choose **New File**, and name it with a capital letter and `.jsx`, for example `Journal.jsx`.
4. Paste what you copied.
5. Change the three lines marked `CHANGE ME`:
   - `meta` — the menu name, the web address, and the position in the menu.
   - The function name — match the file name (`Journal`).
   - The title and subtitle.
6. Save. Your page now appears in the menu.

## Writing the page

Everything between `return (` and `);` is what people see. It looks like HTML, with two differences:

- Use `className` instead of `class`.
- Everything must sit inside one outer `<div>`.

### Styling with Tailwind

Style things by adding words to `className`. Common ones:

| You want | Add |
|----------|-----|
| Bigger text | `text-xl` or `text-2xl` |
| Bold | `font-bold` |
| Space around | `p-4` (inside) or `m-4` (outside) |
| Space between items | `gap-4` (in a flex or grid) |
| White card | `bg-white rounded-xl p-5` |
| Brand blue background | `bg-brand-50` |
| Brand blue text | `text-brand-600` |
| Soft grey text | `text-navy/70` |

Full list: https://tailwindcss.com/docs (use the search box).

### Reusable pieces

```jsx
import Button from "../components/Button.jsx";

<Button>Next</Button>
<Button variant="soft">Back</Button>
```

### Example: a card

```jsx
<div className="bg-white rounded-xl p-5 border border-brand-100">
  <h2 className="text-xl font-semibold">Tip of the day</h2>
  <p className="mt-2 text-navy/70">Drink a glass of water.</p>
</div>
```

## Icons

The app uses lucide icons. Find one at https://lucide.dev/icons, then:

```jsx
import { Moon } from "lucide-react";

<Moon className="size-6 text-brand-600" />
```

## Hide a page from the menu

Add `hideFromNav: true` inside `meta`:

```jsx
export const meta = { title: "Secret", path: "/secret", order: 50, hideFromNav: true };
```
