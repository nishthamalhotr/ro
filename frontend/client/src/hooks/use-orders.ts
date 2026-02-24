import { useMutation } from "@tanstack/react-query";
import { api, type InsertOrder } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

type CreateOrderInput = InsertOrder & {
  cartItems: Array<{ productId: number; qty: number }>;
};

export function useCreateOrder() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateOrderInput) => {
      const res = await fetch(api.orders.create.path, {
        method: api.orders.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create order");
      }
      return api.orders.create.responses[201].parse(await res.json());
    },
    onError: (error) => {
      toast({ 
        title: "Order Failed", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });
}

export function useVerifyPayment() {
  return useMutation({
    mutationFn: async (data: { orderId: string; paymentId: string; signature: string }) => {
      const res = await fetch(api.orders.verifyPayment.path, {
        method: api.orders.verifyPayment.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Payment verification failed");
      return api.orders.verifyPayment.responses[200].parse(await res.json());
    },
  });
}
