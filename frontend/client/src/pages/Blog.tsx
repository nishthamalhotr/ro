import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, BookOpen, Users, Clock, MapPin } from "lucide-react";

import { BlogCard } from "@/components/BlogCard";
import { BlogSubmitForm } from "@/components/BlogSubmitForm";
import { Button } from "@/components/ui/button";
import { CONTACT_CONFIG } from "@/lib/contact";

const MOCK_BLOGS = [
  {
    title: "Serving Delhi Since 2006 — 100,000+ Happy Customers",
    excerpt:
      "For nearly two decades, AquaShield has been the bedrock of reliable water purification in the capital. Here is our journey of serving over a lakh families.",
    date: "May 15, 2024",
    location: "South Delhi",
    slug: "serving-delhi-since-2006",
  },
  {
    title: "RO Repair Services Across South Delhi: Our Experience",
    excerpt:
      "From Saket to Chhatarpur, our technicians have seen it all. Discover the most common water quality issues we encounter in South Delhi neighborhoods.",
    date: "June 02, 2024",
    location: "Gurgaon",
    slug: "ro-repair-south-delhi",
  },
  {
    title: "Domestic & Industrial RO Service in Gurgaon and Noida",
    excerpt:
      "Expanding our footprint to provide industrial-grade water solutions and reliable domestic service in the NCR's growing hubs.",
    date: "June 10, 2024",
    location: "Noida",
    slug: "domestic-industrial-ro-service",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-slate-50 pt-20">
      <Helmet>
        <title>
          AquaShield Blog | RO Repair & Water Tips Delhi NCR
        </title>

        <meta
          name="description"
          content="Service updates, water purifier tips, and customer stories from AquaShield — serving Delhi NCR since 2006."
        />

        <meta
          name="keywords"
          content="RO service Delhi, water purifier tips, TDS monitoring, AquaShield blog"
        />

        <meta property="og:title" content="AquaShield Blog" />

        <meta
          property="og:description"
          content="RO repair tips and customer stories from AquaShield."
        />

        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "AquaShield Blog",
            description:
              "Water purifier tips and customer stories.",
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* HERO */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium mb-6"
          >
            <BookOpen className="w-4 h-4" />
            AquaShield Knowledge Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6"
          >
            AquaShield Blog
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto"
          >
            Water purifier tips, service updates, customer stories,
            and expert insights from Delhi NCR's trusted RO experts
            since 2006.
          </motion.p>
        </div>

        {/* SEARCH BAR */}
        <div className="max-w-xl mx-auto mb-16 relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />

          <input
            type="text"
            placeholder="Search articles..."
            className="w-full h-12 rounded-full border border-slate-200 bg-white pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-20">
          <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
            <Users className="w-6 h-6 mx-auto mb-3 text-blue-600" />
            <h3 className="text-3xl font-bold text-blue-600">
              100K+
            </h3>
            <p className="text-slate-500">Customers</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
            <Clock className="w-6 h-6 mx-auto mb-3 text-blue-600" />
            <h3 className="text-3xl font-bold text-blue-600">
              18+
            </h3>
            <p className="text-slate-500">Years</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
            <BookOpen className="w-6 h-6 mx-auto mb-3 text-blue-600" />
            <h3 className="text-3xl font-bold text-blue-600">
              500+
            </h3>
            <p className="text-slate-500">RO Experts</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border text-center">
            <MapPin className="w-6 h-6 mx-auto mb-3 text-blue-600" />
            <h3 className="text-2xl font-bold text-blue-600">
              Delhi NCR
            </h3>
            <p className="text-slate-500">Coverage</p>
          </div>
        </div>

        {/* FEATURED BLOG */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 text-white mb-20"
        >
          <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
            ⭐ Featured Story
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mt-6 mb-4">
            Serving Delhi Since 2006
          </h2>

          <p className="text-blue-100 max-w-2xl text-lg">
            Discover how AquaShield has protected more than
            100,000 homes with trusted RO services and water
            purification expertise.
          </p>

          <Button className="mt-8 bg-white text-blue-700 hover:bg-slate-100">
            Read Story
          </Button>
        </motion.section>
                {/* BLOG GRID */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-slate-900">
              Latest Articles
            </h2>

            <p className="text-slate-500">
              {MOCK_BLOGS.length} Articles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_BLOGS.map((blog, index) => (
              <motion.div
                key={blog.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <BlogCard {...blog} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* NEWSLETTER */}
        <section className="bg-slate-900 rounded-3xl p-10 text-center text-white mb-20">
          <h2 className="text-3xl font-display font-bold mb-4">
            Stay Updated
          </h2>

          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Get water safety tips, RO maintenance guides, and service
            updates delivered directly to your inbox.
          </p>

          <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 rounded-xl px-4 text-black outline-none"
            />

            <Button className="h-12 px-8">
              Subscribe
            </Button>
          </div>
        </section>

        {/* SHARE YOUR STORY */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-20">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-display font-bold mb-4 text-slate-900">
              Share Your Story
            </h2>

            <p className="text-slate-600">
              Have an experience with AquaShield or a water purification tip to
              share? Submit it below!
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <BlogSubmitForm />
          </div>
        </section>
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={CONTACT_CONFIG.whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-4 z-50"
      >
        <Button className="rounded-full h-14 w-14 bg-green-500 hover:bg-green-600 shadow-xl text-xl">
          💬
        </Button>
      </a>
    </div>
  );
}