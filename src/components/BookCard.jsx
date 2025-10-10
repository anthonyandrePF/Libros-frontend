export default function BookCard({ libro }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition relative">
      {/* Categoría o idioma en esquina superior izquierda */}
      <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
        {libro.libro?.idioma_original || "Sin categoría"}
      </span>

      {/* Imagen del libro */}
      <img
        src={libro.imagen || "https://via.placeholder.com/150"}
        alt={libro.libro?.nombre || "Libro sin título"}
        className="rounded-t-lg h-56 w-full object-cover"
      />

      {/* Contenido */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">
          {libro.libro?.nombre}
        </h3>
        <p className="text-sm text-gray-500">
          {libro.autor?.nombre || "Autor desconocido"}
        </p>
        <p className="font-bold mt-2">S/ {libro.precio_venta}</p>
        <button className="mt-3 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
