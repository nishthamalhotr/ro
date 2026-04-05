import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function ThankYou() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="bg-emerald-100 p-5 rounded-3xl mb-6 shadow-sm">
        <CheckCircle2 className="w-16 h-16 text-emerald-600" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-4">Thank You!</h1>
      <p className="text-slate-600 mb-8 max-w-xl">
        Thank you for raising an inquiry. Our team will review your request and contact you shortly.
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-full px-8">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
