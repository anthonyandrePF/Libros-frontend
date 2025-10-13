import { useEffect, useState } from "react";
import { getLibrosDestacados } from "../services/libroService";
import { getAutores } from "../services/autorService";
import BookCard from "../components/BookCard";
import SwiperCarouselDestacados from "../components/Carousel/SwiperCarouselDestacados"; // <-- añadido

export default function HomePage() {
  const [ediciones, setEdiciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Llamamos ambos endpoints en paralelo
        const [edicionesData, autoresData] = await Promise.all([
          getLibrosDestacados(),
          getAutores(),
        ]);

        // 🔗 Enlazamos cada edición con su autor correspondiente
        // (suponiendo que el id del libro coincide con el id del autor)
        const edicionesCompletas = edicionesData.map((ed) => {
          const autorRelacionado = autoresData.find(
            (autor) => autor.id === ed.libro?.id
          );
          return { ...ed, autor: autorRelacionado };
        });

        setEdiciones(edicionesCompletas);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">Cargando libros destacados...</p>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen" style={{ backgroundColor: '#f5f1e8' }}>
      {/* Sección de bienvenida */}
      <section className="text-center py-20 bg-gradient-to-r from-gray-100 to-white rounded-lg shadow-sm">
        <h1 className="text-5xl font-extrabold mb-4">
          Descubre tu próxima gran lectura
        </h1>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Encuentra historias que transformarán tu perspectiva y alimentarán tu
          imaginación.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition">
            Explorar catálogo
          </button>
          <button className="px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            Ver categorías
          </button>
        </div>
      </section>

      {/* Sección de libros */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">
          Libros destacados
        </h2>
<br />

        <section className="carousel_Destacados_section">
          <div className="container">
            <SwiperCarouselDestacados />
          </div>
        </section>

        <br />
        {ediciones.length === 0 ? (
          <p className="text-center text-gray-500">No hay libros disponibles.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {ediciones.map((edicion) => (
              <BookCard key={edicion.id} libro={edicion} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
