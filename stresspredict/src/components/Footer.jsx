export default function Footer() {
  return (
    <footer className="bg-navy-footer text-white text-xs">
      <div className="mx-auto max-w-5xl px-5 py-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center">
        <span className="font-bold">StressPredict</span>
        <span className="text-white/70">&copy; {new Date().getFullYear()}</span>
        <span className="hidden sm:inline text-white/40">|</span>
        <span className="text-white/70">Not a medical diagnosis. For informational purposes only.</span>
      </div>
    </footer>
  );
}
