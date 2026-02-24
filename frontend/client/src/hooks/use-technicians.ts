import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useTechnicians(city?: string) {
  return useQuery({
    queryKey: [api.technicians.list.path, city],
    queryFn: async () => {
      const url = new URL(api.technicians.list.path, window.location.origin);
      if (city) url.searchParams.append("city", city);
      
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch technicians");
      return api.technicians.list.responses[200].parse(await res.json());
    },
  });
}
