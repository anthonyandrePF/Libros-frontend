import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-sm bg-white sticky top-0 z-50">
      {/* --- Logo y nombre --- */}
      <div className="flex items-center gap-2">
        <span className="text-2xl">📚</span>
        <Link
          to="/"
          className="font-bold text-xl text-gray-800 hover:text-blue-600 transition"
        >
          LibroStore
        </Link>
      </div>

      {/* --- Enlaces principales --- */}
      <div className="flex items-center gap-8">
        <Link to="/categorias" className="hover:text-blue-600 transition">
          Categorías
        </Link>

        {/* --- Icono carrito --- */}
        <Link
          to="/carrito"
          className="hover:text-blue-600 transition relative flex items-center"
        >
          <ShoppingCart className="w-6 h-6" />
        </Link>

        {/* --- Menú del usuario --- */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full hover:bg-gray-100 transition flex items-center gap-2"
          >
            <span className="text-2xl">👤</span>
            {user && (
              <span className="text-sm font-medium text-gray-800">
                {user.nombre || "Usuario"}
              </span>
            )}
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
  