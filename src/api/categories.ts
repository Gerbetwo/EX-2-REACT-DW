import { http } from "./http";

export type Category = {
  id: number;
  nombre: string;
};

export const categoriesApi = {
  list: async () => {
    const res = await http<{ data: Category[] }>("/api/categorias");
    return res.data;
  },
};