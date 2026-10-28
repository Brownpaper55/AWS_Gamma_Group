// A dashed box that marks where a page still needs to be built.
// DELETE it from your page once you've built the real content.
export default function Placeholder({ children }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-brand-200 bg-white/60 p-8 text-navy/70">
      {children}
    </div>
  );
}
