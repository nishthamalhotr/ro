import React from "react";
import { Helmet } from "react-helmet";
import { EmailLink } from "@/components/EmailLink";

const WHATSAPP_NUMBER = "+918700762477";
const WHATSAPP_LINK = `https://wa.me/918700762477?text=${encodeURIComponent(
  "Hello, I want to buy / enquire about an RO or spare parts. Please contact me."
)}`;
const EMAIL = "ranjanmanish615@gmail.com";

export default function ProductsPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>RO Supply & Spare Parts — Price Match Guarantee | AquaShield</title>
        <meta
          name="description"
          content="AquaShield supplies all RO brands, spare parts, membranes, pumps & accessories. Price match guarantee. Contact +91 8700762477 or ranjanmanish615@gmail.com."
        />
        <meta name="robots" content="index, follow" />
        {/* LocalBusiness JSON-LD for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "AquaShield",
            telephone: WHATSAPP_NUMBER,
            email: EMAIL,
            address: {
              "@type": "PostalAddress",
              streetAddress: "House No. 40, Rajpur Khurd",
              addressLocality: "Chhatarpur",
              addressRegion: "Delhi",
              postalCode: "110068",
              addressCountry: "IN",
            },
            url: window.location.origin,
            description:
              "AquaShield supplies RO units and spare parts across Delhi NCR. Price-match guarantee and doorstep delivery.",
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-b from-sky-50 to-white py-12 px-6 md:px-12 lg:px-24">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/60 rounded-2xl p-6 md:p-10 shadow-md border border-slate-100">
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                RO Supply & Spare Parts — Fast Delivery, Price-Match Guarantee
              </h1>
              <p className="mt-4 text-slate-700 text-base md:text-lg leading-relaxed">
                We provide genuine RO systems, filters, membranes and spare parts for ALL major brands. If you find a lower price — we’ll match it. Contact us via WhatsApp or email and our team will arrange the exact product you want.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg transition-all hover:scale-[1.02]"
                  aria-label="Contact on WhatsApp"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .006 5.408 0 12.045c0 2.12.554 4.189 1.602 6.006L0 24l6.149-1.613a11.815 11.815 0 005.904 1.569h.005c6.632 0 12.042-5.41 12.046-12.047a11.817 11.817 0 00-3.486-8.451" fill="currentColor" />
                  </svg>
                  WhatsApp: {WHATSAPP_NUMBER}
                </a>

                <EmailLink
                  className="inline-flex flex-col items-start justify-center px-8 py-3.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-900 font-bold shadow-sm transition-all hover:scale-[1.02] w-full sm:w-auto"
                >
                  <span className="text-xs font-normal text-slate-500 uppercase tracking-wider">Email:</span>
                  <span className="text-sm sm:text-base">{EMAIL}</span>
                </EmailLink>
              </div>
            </div>

            {/* Price Match + Benefits */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-slate-900">Price Match Guarantee</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">
                  Find a lower price on the same genuine product and we'll match it. We verify authenticity & warranty before matching.
                </p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-slate-900">All Brands Supported</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">We source parts for KENT, Aquaguard, Livpure, AO Smith and every other brand.</p>
              </div>

              <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-slate-900">Doorstep Delivery</h3>
                <p className="mt-2 text-slate-600 text-sm leading-relaxed">Same-day dispatch within Delhi NCR when stock permits. Installation available on request.</p>
              </div>
            </div>

            {/* Available Products List */}
            <section className="mt-10 bg-white rounded-xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900">Products & Spare Parts We Supply</h2>
              <p className="mt-2 text-slate-600">We supply genuine parts, spares and full RO units. If you don't see your item listed, contact us — we'll source it.</p>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 list-none">
                {[
                  { title: "Domestic RO units", desc: "All brands like KENT, Aquaguard, etc." },
                  { title: "Replacement filters", desc: "Carbon, Sediment, Spun, Pre-filter" },
                  { title: "RO Membranes", desc: "High-rejection TDS-rated membranes" },
                  { title: "RO Pumps", desc: "Heavy-duty pumps for all brands" },
                  { title: "Solenoid valves", desc: "Auto-cut off and inlet valves" },
                  { title: "Adapters & Fittings", desc: "SMPS adapters and leak-proof fittings" },
                  { title: "Electrical parts", desc: "PCBs, Low Pressure Switches, Sensors" },
                  { title: "UV lamps & adapters", desc: "Philips and other genuine UV spares" },
                  { title: "Faulty parts & repair kits", desc: "Complete repair solutions" },
                  { title: "Complete filter kits", desc: "Full service filter replacement packs" },
                ].map((item) => (
                  <li key={item.title} className="bg-slate-50/50 rounded-lg p-4 border border-slate-100">
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.desc}. WhatsApp for pricing.</p>
                  </li>
                ))}
              </ul>

              {/* Simple spare list CTA */}
              <div className="mt-8 border-t border-slate-100 pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="max-w-md">
                  <p className="text-slate-700 leading-relaxed">
                    Need a specific spare part or membrane? Send a photo on WhatsApp (<strong>{WHATSAPP_NUMBER}</strong>) or email us at <strong><EmailLink /></strong>.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <a
                    href={WHATSAPP_LINK}
                    className="px-6 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-center transition-all shadow-sm"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Message on WhatsApp
                  </a>

                  <EmailLink
                    className="px-6 py-2.5 rounded-lg border border-slate-200 text-slate-800 font-bold text-center hover:bg-slate-50 transition-all"
                  >
                    Email Us
                  </EmailLink>
                </div>
              </div>
            </section>

            {/* FAQ / How it works */}
            <section className="mt-10 p-6 bg-slate-50 rounded-xl border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">How ordering works</h2>
              <ol className="mt-4 space-y-3 list-decimal ml-5 text-slate-700">
                <li className="pl-2">Tell us what you need (WhatsApp photo or model number).</li>
                <li className="pl-2">We confirm price, warranty & shipping time.</li>
                <li className="pl-2">We dispatch same-day / next-day within Delhi NCR when in stock.</li>
                <li className="pl-2">We offer installation & AMC (optional).</li>
              </ol>
            </section>

            <footer className="mt-12 text-center text-sm text-slate-400 pb-12">
              <p>
                Note: This page is a supply & enquiry landing. Product catalogue & purchasing flow will return when full inventory sync is re-enabled.
              </p>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
