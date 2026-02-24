import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { BlogCard } from "@/components/BlogCard";
import { BlogSubmitForm } from "@/components/BlogSubmitForm";

const MOCK_BLOGS = [
  {
    title: "Serving Delhi Since 2006 — 100,000+ Happy Customers",
    excerpt: "For nearly two decades, AquaShield has been the bedrock of reliable water purification in the capital. Here is our journey of serving over a lakh families.",
    date: "May 15, 2024",
    location: "South Delhi",
    slug: "serving-delhi-since-2006"
  },
  {
    title: "RO Repair Services Across South Delhi: Our Experience",
    excerpt: "From Saket to Chhatarpur, our technicians have seen it all. Discover the most common water quality issues we encounter in South Delhi neighborhoods.",
    date: "June 02, 2024",
    location: "Gurgaon",
    slug: "ro-repair-south-delhi"
  },
  {
    title: "Domestic & Industrial RO Service in Gurgaon and Noida",
    excerpt: "Expanding our footprint to provide industrial-grade water solutions and reliable domestic service in the NCR's growing hubs.",
    date: "June 10, 2024",
    location: "Noida",
    slug: "domestic-industrial-ro-service"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <Helmet>
        <title>AquaShield Blog | RO Repair & Water Tips Delhi NCR</title>
        <meta name="description" content="Service updates, water purifier tips, and customer stories from AquaShield — serving Delhi NCR since 2006." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4"
          >
            AquaShield Blog
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Service updates, water purifier tips, and customer stories from AquaShield — serving Delhi NCR since 2006.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {MOCK_BLOGS.map((blog, index) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <BlogCard {...blog} />
            </motion.div>
          ))}
        </div>

        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-display font-bold mb-4 text-slate-900">Share Your Story</h2>
            <p className="text-slate-600">Have an experience with AquaShield or a water purification tip to share? Submit it below!</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <BlogSubmitForm />
          </div>
        </section>
      </div>
    </div>
  );
}
