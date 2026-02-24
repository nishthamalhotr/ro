import { Link } from "wouter";
import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  const discount = Math.round(((product.price - product.salePrice) / product.price) * 100);

  return (
    <div className="group bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-secondary/50 overflow-hidden">
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 z-10">
            {discount}% OFF
          </Badge>
        )}
        <Link href={`/products/${product.slug}`}>
          <img 
            src={product.images?.[0] || "https://images.unsplash.com/photo-1544976766-383738555815?auto=format&fit=crop&q=80"} // Water purifier related
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs text-muted-foreground border-transparent bg-secondary px-2 py-0.5">
            {product.category}
          </Badge>
        </div>
        
        <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors">
          <h3 className="font-display font-bold text-lg leading-tight mb-2 line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(42 reviews)</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-muted-foreground line-through">₹{product.price.toLocaleString()}</p>
            <p className="font-display font-bold text-xl text-primary">₹{product.salePrice.toLocaleString()}</p>
          </div>
          <Link href={`/products/${product.slug}`}>
            <Button 
              size="sm" 
              variant="outline"
              className="rounded-full px-4"
            >
              View <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
