import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Search, Heart, User, ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("usuario") || "null");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("usuario");
    setUser(null);
    navigate("/");
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    {
      title: "Ficción",
      items: ["Ciencia Ficción", "Fantasía", "Misterio", "Romance", "Terror", "Aventuras", "Policial"]
    },
    {
      title: "No Ficción",
      items: ["Biografía", "Autoayuda", "Historia", "Filosofía"]
    },
    {
      title: "Juvenil e Infantil",
      items: ["Infantil", "Juvenil"]
    },
    {
      title: "Otros",
      items: ["Cómic/Novela Gráfica", "Literatura Latinoamericana"]
    }
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Bar */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="text-3xl transform group-hover:scale-110 transition-transform">📚</div>
              <span className="font-bold text-2xl text-gray-800 group-hover:text-blue-600 transition-colors">
                LibroStore
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en LibroStore..."
                  className="w-full px-4 py-2.5 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </form>

            {/* Right Icons */}
            <div className="flex items-center gap-6">
              {/* Wishlist */}
              <Link to="/favoritos" className="hidden md:flex items-center gap-2 hover:text-blue-600 transition-colors group">
                <Heart className="w-6 h-6 group-hover:fill-red-500 group-hover:text-red-500 transition-all" />
              </Link>

              {/* Cart */}
              <Link to="/carrito" className="relative hover:text-blue-600 transition-colors group">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform">
                  0
                </span>
              </Link>

              {/* User Menu - Desktop */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setMenuOpen((s) => !s)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{user ? user.nombre : "Mi Cuenta"}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-50"
                    >
                      {!user ? (
                        <>
                          <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                            Iniciar sesión
                          </Link>
                          <Link to="/register" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                            Registrarse
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="/perfil" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                            Mi perfil
                          </Link>
                          <Link to="/pedidos" onClick={() => setMenuOpen(false)} className="block px-4 py-2 hover:bg-gray-100">
                            Mis pedidos
                          </Link>
                          <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                            Cerrar sesión
                          </button>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Button */}
              <button onClick={() => setMobileMenuOpen((s) => !s)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <form onSubmit={handleSearch} className="md:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar libros..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="hidden md:block bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-8 py-3">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen((s) => !s)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <span>Categorías</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${categoriesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {categoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="absolute left-0 top-full mt-2 w-[800px] bg-white border border-gray-200 rounded-lg shadow-2xl p-6 z-50"
                    style={{ transformOrigin: "top left" }}
                  >
                    <div className="grid grid-cols-4 gap-6">
                      {categories.map((category) => (
                        <div key={category.title}>
                          <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
                            {category.items.map((item) => (
                              <li key={item}>
                                <Link
                                  to={`/categoria/${item.toLowerCase().replace(/\s+/g, "-")}`}
                                  onClick={() => setCategoriesOpen(false)}
                                  className="text-sm text-gray-600 hover:text-blue-600 hover:pl-2 transition-all block"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t">
                      <Link
                        to="/libros"
                        onClick={() => setCategoriesOpen(false)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        Ver todos los libros →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Links */}
            <Link to="/novedades" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Novedades
            </Link>
            <Link to="/bestsellers" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Más vendidos
            </Link>
            <Link to="/ofertas" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Ofertas
            </Link>
            <Link to="/autores" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Autores
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Categories (si quieres mostrar en móvil) */}
      <AnimatePresence>
        {categoriesOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full mt-2 w-[760px] bg-white border border-gray-200 rounded-lg shadow-2xl p-6 z-50 overflow-visible"
            style={{ transformOrigin: "top left" }}
          >
            <div className="grid grid-cols-4 gap-6">
              {categories.map((category) => (
                <div key={category.title} className="min-w-0">
                  <h3 className="font-bold text-gray-800 mb-3 pb-2 border-b-2 border-blue-600 leading-6">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li key={item} className="leading-relaxed">
                        <Link
                          to={`/categoria/${item.toLowerCase().replace(/\s+/g, "-")}`}
                          onClick={() => setCategoriesOpen(false)}
                          className="text-sm text-gray-600 hover:text-blue-600 hover:pl-2 transition-all block truncate"
                        >
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <Link to="/libros" onClick={() => setCategoriesOpen(false)} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Ver todos los libros →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}