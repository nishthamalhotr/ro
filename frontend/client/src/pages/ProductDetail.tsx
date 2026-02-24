import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { useProduct } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Truck, Shield } from "lucide-react";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:slug");
  const { data: product, isLoading } = useProduct(params?.slug || "");

  if (isLoading) return <div className="min-h-screen pt-20 text-center">Loading...</div>;
  if (!product) return <div className="min-h-screen pt-20 text-center">Product not found</div>;

  return (
    <>
      <Helmet>
        <title>{product.metaTitle || `${product.name} - AquaShield`}</title>
        <meta name="description" content={product.metaDescription || product.shortDescription} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-3xl border border-border overflow-hidden p-8 flex items-center justify-center">
              <img 
                src={product.images?.[0] || "https://images.unsplash.com/photo-1544976766-383738555815?auto=format&fit=crop&q=80"} 
                alt={product.name} 
                className="max-h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Thumbnails would go here */}
          </div>

          {/* Info */}
          <div>
            <div className="mb-4">
              <Link href={`/products?category=${product.category}`}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  {product.category}
                </Badge>
              </Link>
            </div>

            <h1 className="text-4xl font-display font-bold text-slate-900 mb-4">{product.name}</h1>
            
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-bold text-primary">₹{product.salePrice.toLocaleString()}</span>
              {product.price > product.salePrice && (
                <span className="text-xl text-muted-foreground line-through">₹{product.price.toLocaleString()}</span>
              )}
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {product.shortDescription}
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <div className="bg-green-100 p-1 rounded-full"><Check className="w-4 h-4 text-green-600" /></div>
                Free Installation within 24 Hours
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <div className="bg-green-100 p-1 rounded-full"><Shield className="w-4 h-4 text-green-600" /></div>
                {product.warrantyMonths} Months Warranty
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <div className="bg-green-100 p-1 rounded-full"><Truck className="w-4 h-4 text-green-600" /></div>
                Free Delivery across Delhi NCR
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/contact" className="flex-1">
                <Button 
                  size="lg" 
                  className="w-full h-14 text-lg rounded-xl shadow-xl shadow-primary/20"
                >
                  Book Demo / Inquiry
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-14 rounded-xl px-8">
                Wishlist
              </Button>
            </div>
          </div>
        </div>

        {/* Specs & Details */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold font-display mb-8">Technical Specifications</h2>
          <div className="bg-slate-50 rounded-2xl p-8 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {Object.entries(product.specs || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between py-3 border-b border-slate-200 last:border-0">
                  <span className="font-medium text-slate-600">{key}</span>
                  <span className="font-bold text-slate-900">{value as string}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
