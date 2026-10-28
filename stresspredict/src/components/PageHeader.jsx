// Reusable title block. Use at the top of every page:
// <PageHeader title="My page" subtitle="One short sentence." />
export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-navy">{title}</h1>
      {subtitle && <p className="mt-2 text-lg text-navy/70">{subtitle}</p>}
    </div>
  );
}
