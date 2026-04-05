import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export function useCreateLead() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/leads', data);
      return res.data;
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
