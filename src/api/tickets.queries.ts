// src/api/tickets.queries.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ticketsApi, type TicketRequest } from "./tickets";
import { categoriesApi } from "./categories";

export const ticketKeys = {
  all: ["tickets"] as const,
};

export function useTickets() {
  return useQuery({
    queryKey: ticketKeys.all,
    queryFn: ticketsApi.findAll,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: categoriesApi.list,
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: TicketRequest) => ticketsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ticketKeys.all });
    }
  });
}