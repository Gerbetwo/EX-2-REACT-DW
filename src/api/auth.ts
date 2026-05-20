// src/api/auth.ts
import { http } from "./http";

export type AuthResponse = {
  token: string;
  username: string;
};

export type LoginDto = {
  username: string;
  password: string;
};

// Añadimos la estructura de tu ApiResponse del backend
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const authApi = {
  login: async (dto: LoginDto) => {
    // Le decimos que espere el ApiResponse
    const res = await http<ApiResponse<AuthResponse>>("/api/auth/login", { 
      method: "POST", 
      body: JSON.stringify(dto) 
    });
    // Retornamos SOLO la data, que es donde vienen el token y el username
    return res.data;
  },
};