import { useMutation } from "@tanstack/react-query";
import { api, type InsertLead } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateLead() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertLead) => {
      const res = await fetch(api.leads.create.path, {
        method: api.leads.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to submit inquiry");
      return api.leads.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({ 
        title: "Inquiry Sent!", 
        description: "We will contact you shortly." 
      });
    },
    onError: () => {
      toast({ 
        title: "Error", 
        description: "Could not submit inquiry. Please try again.", 
        variant: "destructive" 
      });
    },
  });
}
