import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Phone, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CONTACT_CONFIG } from "@/lib/contact";
import { EmailLink } from "@/components/EmailLink";

import AMCPlans from "@/components/AMCPlans";
import SparePartsTable from "@/components/SparePartsTable";
import ServiceCharges from "@/components/ServiceCharges";
import { ResponsiveBg } from "@/components/Background/ResponsiveBg";

export default function Home() {
  const { data: amcPlans } = useQuery<any[]>({ queryKey: ["/api/amc-plans"] });

  const brands = [
    "Aquafresh",
    "Kent",
    "Aquaguard",
    "Livpure",
    "Purit",
    "Eureka Forbes",
    "LG",
    "Bluestar",
    "AO Smith",
    "Nasaka",
  ];

  const locations = [
    "Delhi",
    "Noida",
    "Gurgaon",
    "Dwarka",
    "Saket",
    "Rohini",
    "Ghaziabad",
    "Faridabad",
  ];

  return (
    <>
      <Helmet>
        <title>AquaShield — Premium RO Services</title>
      </Helmet>

      {/* HERO */}
      <ResponsiveBg
        name="pexels-chuck-3500006_1770009381899"
        className="pt-28 pb-36 lg:pt-40 lg:pb-48"
        overlayClassName="bg-gradient-to-br from-black/95 via-black/80 to-black/60"
        parallax
      >
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full text-sm mb-6 border border-white/10">
              <ShieldCheck className="w-4 h-4" />
              Premium RO Experts
            </div>

            <h1 className="font-black text-5xl lg:text-7xl leading-tight mb-6">
              Fast, Reliable RO Repair
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                in Delhi NCR
              </span>
            </h1>

            <p className="text-neutral-300 mb-8 max-w-lg">
              1-hour doorstep RO service with verified technicians and genuine parts.
            </p>

            <div className="flex gap-4 flex-wrap">
              <a href={`tel:${CONTACT_CONFIG.phone.full}`}>
                <Button className="bg-white text-black rounded-full px-6">
                  <Phone className="mr-2" /> Call Now
                </Button>
              </a>

              <Link href="/contact">
                <Button variant="outline" className="border-white text-white rounded-full">
                  Book Service
                </Button>
              </Link>

              <a href={CONTACT_CONFIG.whatsapp.link} target="_blank">
                <Button className="bg-white/10 text-white border border-white/10 rounded-full">
                  <MessageCircle className="mr-2" /> WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </ResponsiveBg>

      {/* MAIN DARK CONTENT */}
      <main className="bg-[#0B0B0C] text-white">

        {/* ================= SPARE PARTS FIRST ================= */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-2xl font-semibold mb-4">Spare Parts Pricing</h3>
            <SparePartsTable />
          </div>
        </section>

        {/* ================= SERVICE CHARGES ================= */}
        <section className="border-t border-white/10 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold mb-4">
                RO Service Charges in Delhi
              </h3>
              <ServiceCharges />
            </div>
          </div>
        </section>

        {/* ================= AMC LAST ================= */}
        <section className="border-t border-white/10 py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-2xl font-semibold mb-4">AMC Plans</h3>
              <AMCPlans />
            </div>
          </div>
        </section>

        {/* ================= BRANDS ================= */}
<section className="border-t border-white/10 py-16 bg-gradient-to-b from-black to-gray-900">
  <div className="max-w-5xl mx-auto px-4 text-center">
    
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-tight text-white">
      Supported RO Brands
    </h2>
    <p className="text-white/60 mb-8 text-sm">
      We service all major water purifier brands
    </p>

    {/* Carousel Wrapper */}
    <div className="overflow-hidden relative">
      
      {/* Moving Track */}
      <div className="flex gap-4 animate-scroll whitespace-nowrap">
        
        {[...brands, ...brands].map((brand, i) => (
          <div
            key={i}
            className="min-w-[120px] flex items-center justify-center h-16 rounded-lg 
                       bg-white/5 border border-white/10
                       transition-all duration-200 
                       hover:bg-white/10 hover:scale-105"
          >
            <span className="text-sm font-medium text-white/80 hover:text-white">
              {brand}
            </span>
          </div>
        ))}

      </div>
    </div>

  </div>
</section>

        {/* ================= LOCATIONS ================= */}
<section className="border-t border-white/10 py-16 bg-gradient-to-b from-black to-gray-900">
  <div className="max-w-5xl mx-auto px-4 text-center">

    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-semibold mb-3 tracking-tight">
      Service Locations
    </h2>
    <p className="text-white/60 mb-8 text-sm">
      Fast RO service available across major cities
    </p>

    {/* Pills */}
    <div className="flex flex-wrap justify-center gap-3">
      {locations.map((loc, i) => (
        <div
          key={i}
          className="group relative px-5 py-2 rounded-full 
                     bg-white/5 border border-white/10 text-sm font-medium 
                     text-white/80 cursor-pointer
                     transition-all duration-200
                     hover:bg-cyan-500/10 hover:text-cyan-400 hover:border-cyan-400/40"
        >
          {/* Subtle Glow */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
                          transition duration-200 blur-md bg-cyan-500/10"></div>

          <span className="relative z-10">{loc}</span>
        </div>
      ))}
    </div>
  </div>
</section>

        {/* ================= CTA ================= */}
<section className="py-16 bg-black border-t border-white/10">
  <div className="max-w-5xl mx-auto px-6">

    <div className="flex flex-col md:flex-row items-center justify-between gap-8 
                    bg-white/5 border border-white/10 rounded-2xl p-8">

      {/* LEFT */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-semibold">
          Pure Drinking Water{" "}
          <span className="text-cyan-400">Guaranteed</span>
        </h2>

        <p className="text-white/60 mt-3 text-sm max-w-md">
          Quick RO service with expert technicians at your doorstep.
        </p>
      </div>

      {/* RIGHT BUTTONS */}
      <div className="flex flex-wrap justify-center gap-3">

        <a
          href="tel:+918700762477"
          className="px-5 py-2.5 rounded-full bg-cyan-500 text-black text-sm font-medium 
                     hover:bg-cyan-400 transition"
        >
          Call Now
        </a>

        <a
          href="https://wa.me/918700762477"
          className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 text-sm 
                     hover:border-cyan-400 hover:text-cyan-400 transition"
        >
          WhatsApp
        </a>

        <a
          href="mailto:support@example.com"
          className="px-5 py-2.5 rounded-full border border-white/20 text-white/80 text-sm 
                     hover:border-cyan-400 hover:text-cyan-400 transition"
        >
          Email
        </a>

      </div>
    </div>
  </div>
</section>
      </main>
    </>
  );
}
