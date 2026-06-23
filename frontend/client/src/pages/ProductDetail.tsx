import { useState } from "react";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useProduct } from "@/hooks/use-products";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import {
  Check,
  Truck,
  Shield,
  Heart,
  Star,
  Phone,
  Clock,
  Package,
} from "lucide-react";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:slug");
  const { data: product, isLoading } = useProduct(
    params?.slug || ""
  );

  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg font-medium text-slate-500">
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Product not found.
      </div>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images
      : [
          "https://images.unsplash.com/photo-1544976766-383738555815?auto=format&fit=crop&q=80",
        ];

  const discount =
    product.price > product.salePrice
      ? Math.round(
          ((product.price - product.salePrice) /
            product.price) *
            100
        )
      : 0;

  return (
    <>
      <Helmet>
        <title>
          {product.metaTitle ||
            `${product.name} | AquaShield`}
        </title>

        <meta
          name="description"
          content={
            product.metaDescription ||
            product.shortDescription
          }
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-14">
          {/* Images */}
          <div>
            <div className="relative bg-white rounded-3xl border shadow-sm p-8 overflow-hidden">
              {discount > 0 && (
                <Badge className="absolute top-5 left-5 bg-red-500 text-white">
                  {discount}% OFF
                </Badge>
              )}

              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-[450px] object-contain transition duration-500 hover:scale-105"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 mt-5">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setSelectedImage(index)
                  }
                  className={`w-24 h-24 rounded-xl overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <Link
              href={`/products?category=${product.category}`}
            >
              <Badge
                variant="secondary"
                className="mb-4"
              >
                {product.category}
              </Badge>
            </Link>

            <h1 className="text-4xl font-bold mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 mb-5">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">
                4.8 Rating
              </span>
              <span className="text-slate-500">
                (125 Reviews)
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-primary">
                ₹{product.salePrice.toLocaleString()}
              </span>

              {product.price >
                product.salePrice && (
                <span className="text-2xl line-through text-slate-400">
                  ₹{product.price.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {product.shortDescription}
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Check className="text-green-600 w-5 h-5" />
                Free installation within 24 hours
              </div>

              <div className="flex items-center gap-3">
                <Shield className="text-green-600 w-5 h-5" />
                {product.warrantyMonths} months warranty
              </div>

              <div className="flex items-center gap-3">
                <Truck className="text-green-600 w-5 h-5" />
                Free delivery across Delhi NCR
              </div>

              <div className="flex items-center gap-3">
                <Package className="text-green-600 w-5 h-5" />
                Genuine spare parts included
              </div>
            </div>

            {/* Trust Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="mx-auto mb-2 text-primary" />
                  <p className="font-medium">
                    Same Day Service
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="mx-auto mb-2 text-primary" />
                  <p className="font-medium">
                    Secure Warranty
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="flex-1"
              >
                <Button
                  size="lg"
                  className="w-full h-14 text-lg"
                >
                  Book Demo
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="h-14"
              >
                <Heart className="w-5 h-5 mr-2" />
                Wishlist
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="h-14"
                asChild
              >
                <a href="tel:+919910472820">
                  <Phone className="w-5 h-5 mr-2" />
                  Call
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-6">
            Product Description
          </h2>

          <div className="bg-slate-50 rounded-2xl p-8">
            <p className="text-slate-600 leading-8">
              {product.description ||
                product.shortDescription}
            </p>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">
            Technical Specifications
          </h2>

          <div className="rounded-2xl border overflow-hidden">
            {Object.entries(product.specs || {}).map(
              ([key, value], index) => (
                <div
                  key={key}
                  className={`flex justify-between px-6 py-5 ${
                    index % 2 === 0
                      ? "bg-slate-50"
                      : "bg-white"
                  }`}
                >
                  <span className="font-medium text-slate-600">
                    {key}
                  </span>

                  <span className="font-semibold">
                    {value as string}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">
            Why AquaShield?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="mx-auto mb-3 text-primary" />
                <h3 className="font-bold mb-2">
                  Free Delivery
                </h3>
                <p className="text-slate-500">
                  Across Delhi NCR.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="mx-auto mb-3 text-primary" />
                <h3 className="font-bold mb-2">
                  Warranty Support
                </h3>
                <p className="text-slate-500">
                  Genuine products and service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="mx-auto mb-3 text-primary" />
                <h3 className="font-bold mb-2">
                  Fast Installation
                </h3>
                <p className="text-slate-500">
                  Same-day installation available.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}