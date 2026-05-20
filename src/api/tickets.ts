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

// Tipo genérico para la respuesta de tu backend
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const ticketsApi = {
  // Extraemos directamente .data de la respuesta genérica del backend
  findAll: async () => {
    const res = await http<ApiResponse<TicketResponse[]>>("/api/tickets");
    return res.data;
  },
};