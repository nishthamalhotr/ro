export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/70 via-slate-900/70 to-black/70" />

      <div className="relative max-w-7xl mx-auto px-6 py-28">
        <div className="inline-flex bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm mb-6">
          Trusted & Verified Service
        </div>

        <h1 className="font-display text-5xl font-bold text-white leading-tight drop-shadow-xl max-w-3xl">
          Fast, Reliable RO Repair & Installation in Delhi NCR
        </h1>

        <p className="mt-6 text-lg text-white/80 max-w-xl">
          Same-day doorstep service by verified technicians.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="bg-sky-600 text-white px-6 py-3 rounded-2xl shadow-lg">
            Call Now
          </button>
          <button className="border border-white/40 text-white px-6 py-3 rounded-2xl">
            Book Service
          </button>
        </div>
      </div>
    </section>
  );
}
