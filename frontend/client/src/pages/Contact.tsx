import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, User, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { CONTACT_CONFIG } from "@/lib/contact";
import { EmailLink } from "@/components/EmailLink";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        toast({
          title: "Message Sent",
          description: "We've received your inquiry and will get back to you soon.",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again or call us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Thank You!</h1>
          <p className="text-slate-600 max-w-md mx-auto">
            Your message has been received. Our team will contact you within 24 hours.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">Send Another Message</Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <Helmet>
        <title>Contact Us - AquaShield Solutions | RO Repair & Service Delhi</title>
        <meta name="description" content="Contact AquaShield Solutions for expert RO repair, installation, and AMC services in Delhi NCR. Call +91 8700762477." />
      </Helmet>

      <div className="bg-primary py-20 text-white text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Contact & Support</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Delhi's trusted experts for RO repair, installation, and AMC services. 
            Reach out to us for doorstep service within 1 hour.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <Card className="hover-elevate">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">Get in Touch</h2>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Ranjeet Sharma</p>
                    <p className="text-sm text-slate-500">Senior Technician</p>
                    <a href="tel:+919910472820" className="text-primary font-medium hover:underline">+91 9910472820</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-primary">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Manish Ranjan</p>
                    <p className="text-sm text-slate-500">Orders & Enquiries</p>
                    <a href={`tel:${CONTACT_CONFIG.phone.full}`} className="text-primary font-medium hover:underline">{CONTACT_CONFIG.phone.display}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Email Us</p>
                    <EmailLink className="text-primary font-medium hover:underline" />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Office Address</p>
                    <p className="text-sm text-slate-500">
                      House No. 40, Rajpur Khurd, Chhatarpur,<br/>
                      South Delhi - 110068
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name</label>
                      <Input name="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input name="phone" placeholder="+91 87007 62477" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address (Optional)</label>
                    <Input name="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">How can we help?</label>
                    <Textarea 
                      name="message" 
                      placeholder="Tell us about your RO problem or requirement..." 
                      className="min-h-[150px]"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4 ml-2" />
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
