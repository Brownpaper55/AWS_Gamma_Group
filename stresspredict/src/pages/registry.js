// Finds every page file in this folder automatically.
// A page file must `export const meta = { title, path, order }` and a default component.
const modules = import.meta.glob("./*.jsx", { eager: true });

export const pages = Object.values(modules)
  .filter((m) => m.meta && m.default)
  .map((m) => ({ ...m.meta, Component: m.default }))
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
