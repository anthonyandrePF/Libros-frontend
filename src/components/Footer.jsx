import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Columna 1 */}
        <div>
          <h2 className="text-white font-bold text-xl mb-3">LibroStore</h2>
          <p className="text-gray-400 text-sm">
            Tu portal para descubrir libros que inspiran, educan y entretienen.
          </p>
        </div>

        {/* Columna 2 */}
        <div>
          <h3 className="text-white font-semibold mb-3">Explorar</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Inicio</Link></li>
            <li><Link to="/categorias" className="hover:text-white">Categorías</Link></li>
            <li><Link to="/ediciones" className="hover:text-white">Ediciones</Link></li>
            <li><Link to="/contacto" className="hover:text-white">Contáctanos</Link></li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div>
          <h3 className="text-white font-semibold mb-3">Ayuda</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:text-white">Preguntas frecuentes</Link></li>
            <li><Link to="/soporte" className="hover:text-white">Soporte</Link></li>
            <li><Link to="/terminos" className="hover:text-white">Términos y condiciones</Link></li>
          </ul>
        </div>

        {/* Columna 4 */}
        <div>
          <h3 className="text-white font-semibold mb-3">Síguenos</h3>
          <div className="flex gap-4 text-gray-400">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} LibroStore — Todos los derechos reservados.
      </div>
    </footer>
  );
}
