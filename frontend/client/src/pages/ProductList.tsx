import React, { JSX, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Search,
  MessageCircle,
  Shield,
  Truck,
  Star,
  CheckCircle,
  Phone,
} from "lucide-react";

import { EmailLink } from "@/components/EmailLink";

const WHATSAPP_NUMBER = "+918700762477";

const WHATSAPP_LINK = `https://wa.me/918700762477?text=${encodeURIComponent(
  "Hello, I want information about RO products and spare parts."
)}`;

const PRODUCTS = [
  {
    title: "Domestic RO Units",
    category: "RO Systems",
    desc: "KENT, Aquaguard, Livpure and other brands.",
    image:
      "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/056d7513-027e-4b05-83ad-623efa32951c.png",
    badge: "Best Seller",
  },
  {
    title: "Replacement Filters",
    category: "Filters",
    desc: "Carbon, sediment and spun filters.",
    image:
      "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/530b3495-7e7c-45ba-8d47-481e26a2c50b.png",
    badge: "Popular",
  },
  {
    title: "RO Membranes",
    category: "Membranes",
    desc: "High TDS rejection membranes.",
    image:
      "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/1da67874-f96d-4ea2-9b76-ade97d828211.png",
    badge: "Genuine",
  },
  {
    title: "RO Pumps",
    category: "Pumps",
    desc: "Heavy-duty pumps for all brands.",
    image:
      "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/31a7c1ed-4d6b-4850-a39a-ed60b375040e.png",
    badge: "Top Rated",
  },
  {
    title: "Solenoid Valves",
    category: "Valves",
    desc: "Automatic cut-off valves.",
    image:
      "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/a6c9c504-c750-4ba1-9e78-9d4b8a6704be.png",
    badge: "New",
  },
  {
    title: "Electrical Parts",
    category: "Electrical",
    desc: "PCBs, sensors and switches.",
    image:
      "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/434e46bc-0b71-4e59-a2f1-c98bf8fc31d6.png",
    badge: "Original",
  },
];

export default function ProductsPage(): JSX.Element {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(PRODUCTS.map((p) => p.category)),
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchSearch =
        product.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        product.desc
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchCategory =
        activeCategory === "All" ||
        product.category === activeCategory;

      return matchSearch && matchCategory;
    });
  }, [search, activeCategory]);

  return (
    <>
      <Helmet>
        <title>
          RO Products & Spare Parts | AquaShield
        </title>

        <meta
          name="description"
          content="Buy RO systems, membranes, filters, pumps and spare parts across Delhi NCR."
        />
      </Helmet>

      <main className="min-h-screen bg-slate-50">

        {/* HERO */}
        <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              RO Systems & Spare Parts
            </h1>

            <p className="max-w-3xl mx-auto text-lg text-blue-100">
              Genuine products, price-match guarantee,
              fast delivery and installation support.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>

              <a
                href="tel:+918700762477"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="-mt-10 max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <h3 className="text-3xl font-bold text-primary">
                5000+
              </h3>
              <p className="text-slate-500">
                Customers
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <h3 className="text-3xl font-bold text-primary">
                15+
              </h3>
              <p className="text-slate-500">
                Brands
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <h3 className="text-3xl font-bold text-primary">
                24 Hrs
              </h3>
              <p className="text-slate-500">
                Delivery
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 text-center">
              <h3 className="text-3xl font-bold text-primary">
                100%
              </h3>
              <p className="text-slate-500">
                Genuine
              </p>
            </div>
          </div>
        </section>

        {/* SEARCH */}
        <section className="max-w-7xl mx-auto px-4 mt-14">

          <div className="relative">
            <Search className="absolute left-5 top-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-14 pr-4 py-4 rounded-2xl border shadow-sm"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setActiveCategory(category)
                }
                className={`px-5 py-2 rounded-full transition ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-white border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="max-w-7xl mx-auto px-4 py-12">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredProducts.map((product) => (
              <div
                key={product.title}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm border hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <div className="relative">

                  <span className="absolute top-4 left-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full z-10">
                    {product.badge}
                  </span>

                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                <div className="p-6">

                  <span className="text-xs text-primary font-medium">
                    {product.category}
                  </span>

                  <h3 className="text-xl font-bold mt-2">
                    {product.title}
                  </h3>

                  <p className="text-slate-600 mt-3">
                    {product.desc}
                  </p>

                  <div className="flex gap-3 mt-6">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-center font-medium"
                    >
                      Get Price
                    </a>

                    <a
                      href="tel:+918700762477"
                      className="flex-1 border rounded-xl py-3 text-center font-medium"
                    >
                      Call
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST */}
        <section className="max-w-6xl mx-auto px-4 py-10">

          <div className="bg-white rounded-3xl shadow p-10">

            <h2 className="text-3xl font-bold text-center mb-10">
              Why Choose AquaShield?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">

              <div className="text-center">
                <Shield className="mx-auto text-primary w-10 h-10 mb-4" />
                <h3 className="font-bold">
                  Genuine Products
                </h3>
                <p className="text-slate-500 mt-2">
                  Original RO spare parts.
                </p>
              </div>

              <div className="text-center">
                <Truck className="mx-auto text-primary w-10 h-10 mb-4" />
                <h3 className="font-bold">
                  Fast Delivery
                </h3>
                <p className="text-slate-500 mt-2">
                  Same day dispatch.
                </p>
              </div>

              <div className="text-center">
                <CheckCircle className="mx-auto text-primary w-10 h-10 mb-4" />
                <h3 className="font-bold">
                  Price Match
                </h3>
                <p className="text-slate-500 mt-2">
                  Best price guarantee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section className="max-w-6xl mx-auto px-4 py-10">

          <h2 className="text-3xl font-bold text-center mb-10">
            Customer Reviews
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "Excellent service and genuine products.",
              "Very quick delivery and installation.",
              "Best prices in Delhi NCR.",
            ].map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-slate-600">
                  {review}
                </p>

                <h4 className="font-bold mt-4">
                  Customer
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 py-16">

          <div className="bg-primary rounded-3xl text-white text-center p-12">

            <h2 className="text-4xl font-bold mb-4">
              Need a Specific Spare Part?
            </h2>

            <p className="text-blue-100 max-w-2xl mx-auto">
              Send us a photo or model number and
              our team will help you find it.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 px-8 py-4 rounded-xl font-semibold"
              >
                WhatsApp Us
              </a>

              <EmailLink className="bg-white text-primary px-8 py-4 rounded-xl font-semibold">
                Email Us
              </EmailLink>
            </div>
          </div>
        </section>

        {/* Floating WhatsApp */}
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-24 right-6 z-50"
        >
          <div className="w-16 h-16 rounded-full bg-green-500 shadow-xl flex items-center justify-center">
            <MessageCircle className="text-white w-8 h-8" />
          </div>
        </a>

        {/* Mobile Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex gap-3 lg:hidden z-50">
          <a
            href="tel:+918700762477"
            className="flex-1 bg-primary text-white py-3 rounded-xl text-center font-semibold"
          >
            Call Now
          </a>

          <a
            href={WHATSAPP_LINK}
            className="flex-1 bg-green-500 text-white py-3 rounded-xl text-center font-semibold"
          >
            WhatsApp
          </a>
        </div>
      </main>
    </>
  );
}