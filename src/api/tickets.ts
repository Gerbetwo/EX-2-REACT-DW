// src/api/tickets.ts
import { http } from "./http";

export type TicketStatus = "ABIERTO" | "EN_PROCESO" | "PENDIENTE" | "RESUELTO" | "CERRADO";
export type Priority = "BAJA" | "MEDIA" | "ALTA" | "CRITICA";

export type TicketResponse = {
  id: number;
  titulo: string;
  descripcion: string;
  status: TicketStatus;
  prioridad: Priority;
  categoriaNombre?: string;
  asignadoAUsername?: string;
  createdAt: string;
};

// Esta interfaz debe ser exportada para usarla en el formulario
export type TicketRequest = {
  titulo: string;
  descripcion: string;
  prioridad: string;
  categoriaId: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const ticketsApi = {
  findAll: async () => {
    const res = await http<ApiResponse<TicketResponse[]>>("/api/tickets");
    return res.data;
  },
  create: async (dto: TicketRequest) => {
    const res = await http<ApiResponse<TicketResponse>>("/api/tickets", {
        method: "POST",
        body: JSON.stringify(dto)
    });
    return res.data;
  }
};