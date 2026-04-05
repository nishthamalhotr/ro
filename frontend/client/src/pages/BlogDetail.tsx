import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  MapPin,
  Users,
  Calendar,
  Activity,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_CONFIG } from "@/lib/contact";
import { BlogSubmitForm } from "@/components/BlogSubmitForm";

export default function BlogDetail() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* ================= SEO ================= */}
      <Helmet>
        <title>
          Why Real-Time TDS Monitoring Matters | AquaShield Blog
        </title>

        <meta
          name="description"
          content="Learn why real-time TDS monitoring is critical for safe drinking water in Delhi NCR. Discover how AquaShield protects 100,000+ homes with smart RO insights."
        />

        {/* Google Rich Results */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: "Why Real-Time TDS Monitoring Matters",
            author: "AquaShield",
            datePublished: "2024",
          })}
        </script>
      </Helmet>

      {/* ================= HERO ================= */}
      <div className="h-[420px] bg-slate-900 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />

        <img
          src="https://images.unsplash.com/photo-1544976766-383738555815?auto=format&fit=crop&q=80"
          alt="RO monitoring"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            Real-Time TDS Monitoring:
            <br />
            The Future of Safe Drinking Water
          </motion.h1>

          <div className="flex flex-wrap justify-center gap-6 text-blue-200 font-medium text-sm">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" /> AquaShield Research Team
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Updated 2025
            </span>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose prose-slate lg:prose-lg max-w-none"
        >
          {/* INTRO */}
          <p className="text-xl text-slate-600 font-medium leading-relaxed">
            Water quality in Delhi NCR changes daily — not yearly. Seasonal
            supply shifts, pipeline contamination, and borewell variations can
            drastically alter TDS levels overnight. This is why real-time TDS
            monitoring is no longer a luxury — it's a necessity.
          </p>

          {/* ================= TDS EXPLAINER ================= */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5" /> What is TDS?
            </h3>

            <p className="text-slate-700 leading-relaxed">
              TDS (Total Dissolved Solids) measures the concentration of
              dissolved substances like minerals, salts, and heavy metals in
              water. While some minerals are beneficial, high TDS can indicate
              contamination and unsafe drinking conditions.
            </p>
          </div>

          {/* ================= WHY REAL TIME ================= */}
          <h2 className="font-display">Why Real-Time Monitoring Matters</h2>

          <ul>
            <li>
              <strong>Water quality fluctuates daily</strong> due to supply
              source changes
            </li>
            <li>
              <strong>High TDS damages RO membranes</strong>, increasing
              maintenance costs
            </li>
            <li>
              <strong>Sudden spikes can affect health</strong>, especially for
              children and elderly
            </li>
            <li>
              <strong>Manual testing is outdated</strong> and reactive
            </li>
          </ul>

          {/* ================= SMART RO ================= */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 my-12">
            <h3 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Smart RO is the Future
            </h3>

            <p className="text-blue-100 leading-relaxed">
              Modern RO systems now integrate sensors that track TDS in
              real-time, alert users instantly, and optimize filtration
              performance automatically. This ensures consistently safe water
              while extending machine lifespan.
            </p>
          </div>

          {/* ================= DELHI DATA ================= */}
          <h2 className="font-display">
            Delhi Water Reality: Why Monitoring is Critical
          </h2>

          <p>
            Over the last 18 years, AquaShield has served more than{" "}
            <strong>100,000 households</strong> across Delhi NCR. Our data shows:
          </p>

          <ul>
            <li>South Delhi TDS ranges from 250–900 ppm</li>
            <li>Gurgaon borewell water often crosses 1200 ppm</li>
            <li>Industrial zones show heavy chemical spikes</li>
          </ul>

          <p>
            Without continuous monitoring, families unknowingly consume unsafe
            water for months.
          </p>

          {/* ================= TRUST ================= */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-8 my-12">
            <h3 className="text-xl font-bold text-green-700 flex items-center gap-2 mb-4">
              <ShieldCheck className="w-5 h-5" /> Why People Trust AquaShield
            </h3>

            <ul className="text-slate-700">
              <li>Serving Delhi since 2006</li>
              <li>100,000+ happy customers</li>
              <li>Hygiene-first technicians</li>
              <li>Data-backed water insights</li>
            </ul>
          </div>

          {/* ================= FUTURE ================= */}
          <h2 className="font-display">The Future: AI + Water Safety</h2>

          <p>
            The next evolution in water purification is AI-powered monitoring —
            predictive alerts, automated servicing, and smart analytics. At
            AquaShield, we are actively working towards integrating intelligent
            diagnostics into every home.
          </p>

          <p className="text-lg font-semibold text-slate-800">
            Safe water shouldn't be guessed — it should be measured in real time.
          </p>
        </motion.article>

        {/* ================= CTA ================= */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-10 text-white text-center my-16">
          <h3 className="text-3xl font-display font-bold mb-4">
            Want Real-Time Water Safety?
          </h3>

          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Book a smart RO inspection today and know exactly what you're
            drinking.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${CONTACT_CONFIG.phone.full}`}>
              <Button size="lg" className="bg-white text-primary font-bold">
                <Phone className="w-5 h-5 mr-2" /> Call Now
              </Button>
            </a>

            <a href={CONTACT_CONFIG.whatsapp.link} target="_blank">
              <Button size="lg" className="bg-green-500 border-none font-bold">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
              </Button>
            </a>
          </div>
        </section>

        {/* ================= REVIEWS ================= */}
        <div className="border-t pt-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-4">
              Share Your Experience
            </h2>
            <p className="text-slate-600 mb-8">
              Help others make smarter water choices.
            </p>
            <BlogSubmitForm />
          </div>
        </div>
      </div>
    </div>
  );
}
 