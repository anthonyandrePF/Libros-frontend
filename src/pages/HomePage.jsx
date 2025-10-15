import { useEffect, useState } from "react";
import { getLibrosDestacados } from "../services/libroService";
import { getAutores } from "../services/autorService";
import SwiperCarouselDestacados from "../components/Carousel/SwiperCarouselDestacados";
import SwiperCarouselNovedades from "../components/Carousel/SwiperCarouselNovedades";
import SwiperCarouselFiccion from "../components/Carousel/SwiperCarouselFiccion";
import SwiperCarouselMisterio from "../components/Carousel/SwiperCarouselMisterio";
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

     

      {/* Sección de bienvenida */}
      <section className="mt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 flex items-center justify-center gap-2">
             Bienvenido a LibreríaOnline
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre un mundo infinito de conocimiento y entretenimiento. Tenemos la colección más amplia de libros para todos los gustos y edades.
          </p>
        </div>

        {/* Carruseles de libros */}
        <div className="container">
          <SwiperCarouselDestacados ediciones={ediciones} />
        </div>
        <div className="container">
          <SwiperCarouselFiccion ediciones={ediciones} />
        </div>
        <div className="container">
          <SwiperCarouselMisterio ediciones={ediciones} />
        </div>
        <div className="container">
          <SwiperCarouselNovedades ediciones={ediciones} />
        </div>
      </section>




       {/* Sección de Oferta Especial */}
      <section className="mb-12">
        <div className="container mx-auto">
          <div className="relative rounded-3xl overflow-hidden" 
               style={{
                 background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #3b82f6 100%)'
               }}>
            
            {/* Marca de agua con el 30% */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 text-white opacity-20 font-bold"
                 style={{ fontSize: '180px', lineHeight: '1' }}>
              30%
            </div>

            <div className="relative z-10 p-12">
              {/* Badge de Oferta Especial */}
              <div className="inline-block bg-white rounded-full px-6 py-2 mb-6">
                <span className="text-green-600 font-bold text-sm uppercase tracking-wide">
                  OFERTA ESPECIAL
                </span>
              </div>

              {/* Título principal */}
              <h2 className="text-5xl font-bold text-white mb-4 max-w-2xl">
                ¡30% de descuento en todos los libros de ciencia ficción!
              </h2>

              {/* Código de descuento */}
              <p className="text-xl text-white mb-3">
                Usa el código: <span className="font-bold bg-white bg-opacity-20 px-3 py-1 rounded">SCIFI30</span> al finalizar tu compra.
              </p>

              {/* Fecha de validez */}
              <p className="text-lg text-white text-opacity-90 mb-8">
                Oferta válida hasta el 30 de septiembre.
              </p>

              {/* Botón de acción */}
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                Explorar ahora
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}