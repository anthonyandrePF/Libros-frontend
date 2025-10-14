import { useEffect, useState } from "react";
import { getLibrosDestacados } from "../services/libroService";
import { getAutores } from "../services/autorService";
import SwiperCarouselDestacados from "../components/Carousel/SwiperCarouselDestacados";
import HeroSlider from "../components/Carousel/HeroSlider";

export default function HomePage() {
  const [ediciones, setEdiciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [edicionesData, autoresData] = await Promise.all([
          getLibrosDestacados(),
          getAutores(),
        ]);

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
    <div className="p-8 min-h-screen" style={{ backgroundColor: "#f5f1e8" }}>
      {/* Hero Slider */}
      <section className="hero-section mb-12">
        <div className="container">
          <HeroSlider />
        </div>
      </section>

      {/* Sección de libros destacados */}
      <section className="mt-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
          ⭐ Destacados
        </h2>

        <div className="container">
          <SwiperCarouselDestacados ediciones={ediciones} />
        </div>
      </section>
    </div>
  );
}
