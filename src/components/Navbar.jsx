import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // 👈 Importa Framer Motion

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-sm bg-white sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📚</span>
        <Link
          to="/"
          className="font-bold text-xl text-gray-800 hover:text-blue-600 transition"
        >
          LibroStore
        </Link>
      </div>

      <div className="flex items-center gap-8">
        <Link to="/" className="hover:text-blue-600 transition">Catálogo</Link>
        <Link to="/categorias" className="hover:text-blue-600 transition">Categorías</Link>
        <Link to="/autores" className="hover:text-blue-600 transition">Autores</Link>

        {/* --- Menú del usuario --- */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <span className="text-2xl">👤</span>
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden"
              >
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Registrarse
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/perfil"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Mi perfil
                    </Link>
                    <Link
                      to="/pedidos"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Mis pedidos
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
