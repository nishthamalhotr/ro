import React from "react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic",
    price: "₹1750",
    features: {
      service: true,
      filters: false,
      membrane: false,
      electrical: false,
      faulty: false,
    },
  },
  {
    name: "Pro ⭐",
    price: "₹2550",
    highlight: true,
    features: {
      service: true,
      filters: true,
      membrane: false,
      electrical: true,
      faulty: true,
    },
  },
  {
    name: "Premium",
    price: "₹3660",
    features: {
      service: true,
      filters: true,
      membrane: true,
      electrical: true,
      faulty: true,
    },
  },
];

const Feature = ({ label, value }: any) => (
  <div className="flex justify-between items-center py-1.5 text-sm">
    <span className="text-cyan-300">{label}</span>
    <span className={value ? "text-green-500" : "text-red-500"}>
      {value ? "✔" : "✖"}
    </span>
  </div>
);

const AMCPlansCarousel = () => {
  return (
    <div className="py-14  text-white">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-10 px-4">
        Choose the Perfect RO Plan
      </h2>

      {/* Carousel */}
      <div className="flex justify-center">
  <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className={`snap-center flex-shrink-0 w-[280px] md:w-[320px] rounded-2xl p-6 shadow-xl bg-white/5 backdrop-blur-lg border transition-all duration-300 ${
                plan.highlight
                  ? "border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                  : "border-white/10"
              }`}
            >
              {/* Plan Name */}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>

              {/* Price */}
              <p className="text-3xl font-bold mb-5">
                {plan.price}
                <span className="text-sm text-cyan-200/80"> / year</span>
              </p>

              {/* Features */}
              <div className="space-y-1 mb-6">
                <Feature label="Service" value={plan.features.service} />
                <Feature label="Filters" value={plan.features.filters} />
                <Feature label="Membrane" value={plan.features.membrane} />
                <Feature label="Electrical Parts" value={plan.features.electrical} />
                <Feature label="Faulty Parts" value={plan.features.faulty} />
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3 mt-auto">
                <button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-90 py-2.5 rounded-lg font-semibold transition">
                  Choose Plan
                </button>

                <a
                  href="https://wa.me/91XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-green-500 text-green-500 text-center py-2.5 rounded-lg hover:bg-green-500 hover:text-white transition"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AMCPlansCarousel;