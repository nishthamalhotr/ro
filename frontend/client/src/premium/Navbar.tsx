export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 shadow-lg" />
          <div>
            <p className="font-display text-lg font-semibold text-slate-900">
              AquaShield
            </p>
            <p className="text-xs text-slate-500">Pure Water Solutions</p>
          </div>
        </div>

        <button className="hidden md:inline-flex bg-sky-600 hover:bg-sky-500 text-white px-5 py-2.5 rounded-xl shadow-md transition-all">
          Book Service
        </button>
      </div>
    </header>
  );
}
