import { useState } from "react";
import { authApi } from "../api/auth";
import { useAuth } from "../context/AuthContext";

export default function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate(): string | null {
    if (!username.trim()) return "El usuario es obligatorio.";
    if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    
    if (validationError) { 
      setError(validationError); 
      return; 
    }

    setLoading(true);
    setError(null);

    try {
      const res = await authApi.login({ username, password });
      login(res.token, res.username);
      onSuccess(); 
    } catch (e) {
      setError("Credenciales inválidas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Diseño tipo wireframe con bordes sólidos y sombra dura */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 w-full max-w-sm">
        <h1 className="text-3xl font-black text-black mb-6 uppercase tracking-tight border-b-4 border-black pb-2">Acceso</h1>
        
        {error && (
          <div className="mb-6 bg-black text-white p-3 font-bold text-sm">
            ERROR: {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label className="block text-sm font-bold mb-2 uppercase text-black">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-none border-2 border-black px-3 py-3 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-black font-mono"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2 uppercase text-black">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-none border-2 border-black px-3 py-3 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:border-black font-mono"
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black py-3 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-transparent hover:border-black transition-all disabled:opacity-50"
          >
            {loading ? "Cargando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}