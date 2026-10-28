// Reusable button. <Button onClick={...}>Next</Button>
// variant: "primary" (default) or "soft"
export default function Button({ children, variant = "primary", ...props }) {
  const styles =
    variant === "soft"
      ? "bg-brand-50 text-brand-700 hover:bg-brand-100"
      : "bg-brand-600 text-white hover:bg-brand-700";
  return (
    <button
      className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${styles}`}
      {...props}
    >
      {children}
    </button>
  );
}
