import { useState } from "react";
import { useCreateTicket, useCategories } from "../api/tickets.queries";

// 1. Definimos explícitamente la interfaz de las props
interface CreateTicketProps {
  onCancel: () => void;
}

export default function CreateTicketPage({ onCancel }: CreateTicketProps) {
  const { data: categories = [] } = useCategories();
  const createMut = useCreateTicket();

  const [form, setForm] = useState({ 
    titulo: "", 
    descripcion: "", 
    prioridad: "MEDIA", 
    categoriaId: "" 
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMut.mutate({ ...form, categoriaId: Number(form.categoriaId) }, {
      onSuccess: () => onCancel()
    });
  };

  return (
    <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Nuevo Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full border-2 border-black p-3 font-mono" 
          placeholder="Título" 
          onChange={(e) => setForm({...form, titulo: e.target.value})} 
        />
        <textarea 
          className="w-full border-2 border-black p-3 font-mono" 
          placeholder="Descripción" 
          onChange={(e) => setForm({...form, descripcion: e.target.value})} 
        />
        
        <select 
          className="w-full border-2 border-black p-3 font-bold uppercase" 
          onChange={(e) => setForm({...form, prioridad: e.target.value})}
        >
          <option value="BAJA">Baja</option>
          <option value="MEDIA">Media</option>
          <option value="ALTA">Alta</option>
        </select>

        <select 
          className="w-full border-2 border-black p-3 font-bold uppercase" 
          onChange={(e) => setForm({...form, categoriaId: e.target.value})}
        >
          <option value="">Seleccione categoría</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
        </select>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            className="flex-1 bg-black text-white font-bold p-3 uppercase hover:bg-gray-800"
          >
            Crear
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            className="flex-1 border-2 border-black font-bold p-3 uppercase hover:bg-gray-100"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}