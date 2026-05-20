import { useQuery } from "@tanstack/react-query";
import { ticketsApi } from "./tickets";

export const ticketKeys = {
  all: ["tickets"] as const,
};

export function useTickets() {
  return useQuery({
    queryKey: ticketKeys.all,
    queryFn: ticketsApi.findAll,
  });
}