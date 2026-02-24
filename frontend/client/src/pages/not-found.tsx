import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Droplets } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <div className="bg-primary/10 p-4 rounded-full mb-6">
        <Droplets className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-4xl font-display font-bold mb-4 text-slate-900">404 Page Not Found</h1>
      <p className="text-slate-600 mb-8 max-w-md text-center">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-full px-8">Return Home</Button>
      </Link>
    </div>
  );
}
