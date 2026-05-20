// src/App.tsx
import { useState } from 'react';
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import TicketsPage from "./pages/TicketsPage"; // <-- Importamos nuestra nueva página

// -- COMPONENTES MOCK RESTANTES --
const DepartamentPage = () => (
  <div className="p-10">
    <h2 className="text-4xl font-black uppercase border-b-4 border-black pb-4 mb-6">Categorías</h2>
  </div>
);

const SidebarMenu = ({ onChange, menuOptions }: any) => (
  <div className="w-64 bg-black text-white min-h-screen p-6 border-r-4 border-black flex flex-col">
    <h2 className="mb-10 font-black text-2xl uppercase tracking-widest border-b-2 border-white pb-4">Soporte</h2>
    <ul className="space-y-4">
      {menuOptions.map((opt: any) => (
        <li 
          key={opt.name} 
          onClick={() => onChange(opt.name)} 
          className="cursor-pointer font-bold hover:bg-white hover:text-black p-3 transition-colors uppercase text-sm tracking-wide"
        >
          {opt.content}
        </li>
      ))}
    </ul>
  </div>
);

const MainLayout = ({ sidebar, content }: any) => (
  <div className="flex h-screen w-full bg-white text-black font-sans">
    {sidebar}
    <div className="flex-1 overflow-auto">{content}</div>
  </div>
);
// ----------------------------------------

function App() {
  const { user, logout } = useAuth();
  const [page, setPage] = useState("tickets"); // Ahora por defecto arranca en tickets
  
  const [menuOptions] = useState([
    { name: "tickets", content: "Tickets" },
    { name: "departments", content: "Categorías" }
  ]);

  function renderContent() {
    switch (page) {
      case "tickets": return <TicketsPage />; // Renderiza nuestro componente real
      case "departments": return <DepartamentPage />;
      default: return <TicketsPage />;
    }
  }

  const sidebar = (
    <div className="flex flex-col bg-black min-h-screen">
      <SidebarMenu current={page} onChange={setPage} menuOptions={menuOptions}/>
      <div className="mt-auto p-6 border-t-2 border-gray-800 text-white bg-black w-64">
        <p className="text-xs text-gray-400 mb-4 uppercase tracking-wider font-mono">
          Usuario activo:<br/>
          <span className="text-white font-bold text-sm">{user?.username}</span>
        </p>
        <button
          onClick={logout}
          className="w-full border-2 border-white py-2 text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors cursor-pointer"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <PrivateRoute fallback={<LoginPage onSuccess={() => {}}/>}>
      <MainLayout sidebar={sidebar} content={renderContent()} />
    </PrivateRoute>
  );
}

export default App;