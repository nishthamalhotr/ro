import { Link } from "wouter";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  location: string;
  slug: string;
}

export function BlogCard({ title, excerpt, date, location, slug }: BlogCardProps) {
  return (
    <Card className="group h-full flex flex-col hover:shadow-lg transition-all duration-300 border-slate-200 overflow-hidden rounded-2xl">
      <CardHeader className="p-0 overflow-hidden aspect-video relative">
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <MapPin className="w-3 h-3" /> {location}
          </span>
        </div>
        <img 
          src={`https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800`} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </CardHeader>
      <CardContent className="p-6 flex-1">
        <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
          <Calendar className="w-3 h-3" /> {date}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
          {excerpt}
        </p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <Link href={`/blog/${slug}`}>
          <Button variant="link" className="p-0 h-auto text-primary font-bold flex items-center gap-2 group/btn">
            Read More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
