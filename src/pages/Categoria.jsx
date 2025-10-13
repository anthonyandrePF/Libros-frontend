import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Categorias() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch("http://localhost:8080/RestConectados//libro-categorias");
        if (!response.ok) throw new Error("Error al cargar las categorías");
        const data = await response.json();
        setCategorias(data);
      } catch (err) {
        setError("No se pudieron cargar las categorías 📂");
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-gray-600">
        Cargando categorías...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-red-500">
        {error}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Categorías de Libros
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categorias.length > 0 ? (
          categorias.map((cat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition p-5 text-center"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {cat.nombre || "Categoría sin nombre"}
              </h2>
              <p className="text-sm text-gray-500">
                {cat.descripcion || "Sin descripción disponible."}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No hay categorías disponibles.
          </p>
        )}
      </div>
    </div>
  );
}
