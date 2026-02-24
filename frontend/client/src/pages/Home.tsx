import { Link } from "wouter";
import { Helmet } from "react-helmet";
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
        <section className="border-t border-white/10 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Supported RO Brands</h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {brands.map((brand, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center h-24 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= LOCATIONS ================= */}
        <section className="border-t border-white/10 py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Service Locations</h2>

            <div className="flex flex-wrap justify-center gap-3">
              {locations.map((loc, i) => (
                <Link key={i} href={`/service/${loc.toLowerCase()}`}>
                  <span className="px-5 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition cursor-pointer">
                    {loc}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="border-t border-white/10 py-24 text-center">
          <h2 className="text-4xl font-bold mb-4">Pure Drinking Water Guarantee</h2>

          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <a href={`tel:${CONTACT_CONFIG.phone.full}`}>
              <Button className="bg-white text-black rounded-full">
                Call {CONTACT_CONFIG.phone.display}
              </Button>
            </a>

            <EmailLink subject="RO Service Booking">
              <Button className="border border-white text-white hover:bg-white hover:text-black rounded-full">
                Email Support
              </Button>
            </EmailLink>

            <a href={CONTACT_CONFIG.whatsapp.link} target="_blank">
              <Button className="bg-green-600 rounded-full">
                <MessageCircle className="mr-2" /> WhatsApp
              </Button>
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
