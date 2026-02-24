import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useCreateOrder } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ArrowRight, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();
  const { user } = useAuth();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const handleCheckout = () => {
    // Basic validation
    if (!user && (!guestInfo.email || !guestInfo.phone)) {
      toast({ title: "Missing Info", description: "Please log in or provide guest details.", variant: "destructive" });
      return;
    }

    createOrder({
      subtotal: total,
      tax: total * 0.18, // 18% GST example
      shipping: 0,
      totalAmount: total * 1.18,
      items: items.map(i => ({ 
        productId: i.product.id, 
        qty: i.quantity,
        price: i.product.salePrice,
        name: i.product.name 
      })),
      cartItems: items.map(i => ({ productId: i.product.id, qty: i.quantity })),
      userId: user?.id || null,
      guestInfo: user ? null : guestInfo,
    }, {
      onSuccess: () => {
        clearCart();
        toast({ title: "Order Placed!", description: "Thank you for your purchase." });
        setLocation("/"); // Redirect to success page ideally
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-display font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-6 bg-white p-6 rounded-2xl border border-border shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-xl flex-shrink-0">
                <img src={product.images?.[0]} alt={product.name} className="w-full h-full object-contain p-2" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="font-bold">₹{(product.salePrice * quantity).toLocaleString()}</p>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Unit Price: ₹{product.salePrice.toLocaleString()}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1 hover:bg-white rounded-md transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <button 
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1 hover:bg-white rounded-md transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" /> Remove
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm sticky top-24">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium">₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Tax (18%)</span>
                <span className="font-medium">₹{(total * 0.18).toLocaleString()}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-lg text-primary">₹{(total * 1.18).toLocaleString()}</span>
              </div>
            </div>

            {!user && (
              <div className="space-y-4 mb-6 border-t pt-6">
                <h4 className="font-medium">Guest Checkout</h4>
                <Input placeholder="Full Name" value={guestInfo.name} onChange={e => setGuestInfo({...guestInfo, name: e.target.value})} />
                <Input placeholder="Email" value={guestInfo.email} onChange={e => setGuestInfo({...guestInfo, email: e.target.value})} />
                <Input placeholder="Phone" value={guestInfo.phone} onChange={e => setGuestInfo({...guestInfo, phone: e.target.value})} />
                <Input placeholder="Shipping Address" value={guestInfo.address} onChange={e => setGuestInfo({...guestInfo, address: e.target.value})} />
              </div>
            )}

            <Button 
              className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
              onClick={handleCheckout}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
              {isPending ? "Processing..." : "Place Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
