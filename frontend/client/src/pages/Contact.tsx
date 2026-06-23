import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  User,
  Send,
  CheckCircle2,
  Clock,
  Shield,
  MessageCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { CONTACT_CONFIG } from "@/lib/contact";
import { EmailLink } from "@/components/EmailLink";

export default function Contact() {
  const { toast } = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);

        toast({
          title: "Message Sent Successfully",
          description:
            "Our team will contact you shortly.",
        });
      } else {
        throw new Error();
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          "Please call us directly or try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg"
        >
          <div className="w-24 h-24 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Thank You!
          </h1>

          <p className="text-slate-600 mb-6">
            Your request has been received successfully.
            Our technician will contact you within
            30–60 minutes.
          </p>

          <Button
            onClick={() => setSubmitted(false)}
            size="lg"
          >
            Send Another Message
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Helmet>
        <title>
          Contact AquaShield Solutions | RO Repair Delhi
        </title>

        <meta
          name="description"
          content="RO repair, installation and AMC services in Delhi NCR."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold mb-6"
          >
            Contact & Support
          </motion.h1>

          <p className="max-w-3xl mx-auto text-lg text-blue-100 mb-8">
            Fast RO repair, installation, and AMC
            services at your doorstep across Delhi NCR.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50"
              asChild
            >
              <a href="tel:+919910472820">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-700"
              asChild
            >
              <a
                href="https://wa.me/919910472820"
                target="_blank"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="-mt-10 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <Clock className="w-10 h-10 mx-auto text-blue-600 mb-3" />
              <h3 className="font-bold text-lg">
                1 Hour Service
              </h3>
              <p className="text-slate-500">
                Fast doorstep service.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <Shield className="w-10 h-10 mx-auto text-green-600 mb-3" />
              <h3 className="font-bold text-lg">
                Genuine Parts
              </h3>
              <p className="text-slate-500">
                High-quality spare parts.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6 text-center">
              <CheckCircle2 className="w-10 h-10 mx-auto text-purple-600 mb-3" />
              <h3 className="font-bold text-lg">
                Service Warranty
              </h3>
              <p className="text-slate-500">
                Guaranteed customer satisfaction.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-6 space-y-8">
                <h2 className="text-2xl font-bold">
                  Get in Touch
                </h2>

                <div className="flex gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <User className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Ranjeet Sharma
                    </h3>
                    <p className="text-slate-500 text-sm">
                      Senior Technician
                    </p>
                    <a
                      href="tel:+919910472820"
                      className="text-blue-600 font-medium"
                    >
                      +91 9910472820
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Customer Support
                    </h3>

                    <a
                      href={`tel:${CONTACT_CONFIG.phone.full}`}
                      className="text-blue-600 font-medium"
                    >
                      {CONTACT_CONFIG.phone.display}
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Email Us
                    </h3>

                    <EmailLink className="text-blue-600" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="text-blue-600" />
                  </div>

                  <div>
                    <h3 className="font-bold">
                      Office Address
                    </h3>

                    <p className="text-slate-500">
                      House No. 40,
                      Rajpur Khurd,
                      Chhatarpur,
                      South Delhi – 110068
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-2">
                  Send a Message
                </h2>

                <p className="text-slate-500 mb-8">
                  Fill out the form and our team will
                  contact you shortly.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium">
                        Full Name
                      </label>

                      <Input
                        name="name"
                        placeholder="Your Name"
                        required
                        className="mt-2 h-12"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        Phone Number
                      </label>

                      <Input
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="mt-2 h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Email Address
                    </label>

                    <Input
                      type="email"
                      name="email"
                      placeholder="example@gmail.com"
                      className="mt-2 h-12"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Message
                    </label>

                    <Textarea
                      name="message"
                      required
                      placeholder="Describe your RO issue..."
                      className="mt-2 min-h-[160px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting
                      ? "Sending..."
                      : "Send Message"}

                    <Send className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}