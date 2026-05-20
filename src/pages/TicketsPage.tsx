import { useState } from "react";
import { useTickets } from "../api/tickets.queries";
import CreateTicketPage from "./CreateTicketPage";

export default function TicketsPage() {
  const { data: tickets = [], isLoading, isError, error } = useTickets();
  const [filterStatus, setFilterStatus] = useState<string>("");
// Dentro de TicketsPage.tsx, añade esto:
  const [isCreating, setIsCreating] = useState(false);
  // Filtro derivado: se calcula en cada render (Buena práctica en React)
  const filteredTickets = filterStatus
    ? tickets.filter((t) => t.status === filterStatus)
    : tickets;
  if (isCreating) return <CreateTicketPage onCancel={() => setIsCreating(false)} />;
  return (
    <div className="p-10">
      <h2 className="text-4xl font-black uppercase border-b-4 border-black pb-4 mb-6 tracking-tight">
        Tickets
      </h2>
        <button onClick={() => setIsCreating(true)} className="bg-black text-white px-6 py-2 font-black uppercase mb-4">
        + Nuevo Ticket
        </button>
      {/* Barra de Controles / Filtros */}
      <div className="mb-8 flex gap-4">
        <div className="flex flex-col">
          <label className="text-xs font-bold uppercase mb-1">Filtrar por Estado</label>
          <select
            className="border-4 border-black p-2 font-bold uppercase cursor-pointer hover:bg-gray-100 transition-colors outline-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value=""> TODOS LOS ESTADOS </option>
            <option value="ABIERTO">ABIERTO</option>
            <option value="EN_PROCESO">EN PROCESO</option>
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="RESUELTO">RESUELTO</option>
            <option value="CERRADO">CERRADO</option>
          </select>
        </div>
      </div>

      {/* Estados de carga y error */}
      {isLoading && (
        <div className="border-4 border-black p-6 bg-gray-100 font-mono font-bold animate-pulse text-center">
          CARGANDO TICKETS...
        </div>
      )}

      {isError && (
        <div className="border-4 border-black p-6 bg-black text-white font-mono font-bold text-center">
          ERROR CRÍTICO: {String(error)}
        </div>
      )}

      {/* Tabla de Datos */}
      {!isLoading && !isError && (
        <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-black text-white uppercase text-sm tracking-wider">
              <tr>
                <th className="p-4 border-r-2 border-white">ID</th>
                <th className="p-4 border-r-2 border-white">Título</th>
                <th className="p-4 border-r-2 border-white">Estado</th>
                <th className="p-4 border-r-2 border-white">Prioridad</th>
                <th className="p-4 border-r-2 border-white">Categoría</th>
                <th className="p-4 border-r-2 border-white">Asignado</th>
                <th className="p-4">Fecha</th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center font-bold uppercase text-gray-500">
                    No hay tickets para mostrar.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((t) => (
                  <tr key={t.id} className="border-b-2 border-black hover:bg-gray-100 transition-colors">
                    <td className="p-4 border-r-2 border-black font-black">#{t.id}</td>
                    <td className="p-4 border-r-2 border-black">{t.titulo}</td>
                    <td className="p-4 border-r-2 border-black">
                      <span className="bg-black text-white px-2 py-1 text-xs font-bold tracking-widest">
                        {t.status}
                      </span>
                    </td>
                    <td className="p-4 border-r-2 border-black font-bold">{t.prioridad}</td>
                    <td className="p-4 border-r-2 border-black">{t.categoriaNombre || "N/A"}</td>
                    <td className="p-4 border-r-2 border-black">{t.asignadoAUsername || "---"}</td>
                    <td className="p-4">{new Date(t.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}