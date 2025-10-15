import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./SwiperCarousel.css";

import { getLibrosPorCategoria } from "../../services/libroService";
import { getAutores } from "../../services/autorService";

export default function SwiperCarouselMisterio() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const placeholderImg =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='300' viewBox='0 0 200 300'%3E%3Crect width='200' height='300' fill='%23ececec'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23999' font-family='Arial' font-size='14'%3ESin portada%3C/text%3E%3C/svg%3E";

  const normalizeItems = (items = []) =>
    items.map((it) => ({
      id: it.id,
      titulo: it.titulo ?? it.libro,
      portadaUrl: it.portadaUrl ?? it.portada ?? null,
      precio: Number(it.precio ?? it.precio_venta ?? 0),
      descuento: Number(it.descuento ?? 0),
      nuevo: Boolean(it.nuevo ?? false),
      autor: it.autor ?? { nombre: it.autor },
    }));

  const cargarLibros = async () => {
    setCargando(true);
    setError(false);
    try {
      const [items] = await Promise.all([getLibrosPorCategoria("Misterio")]);
      const normalized = normalizeItems(items || []);
      setLibros(normalized);
    } catch (err) {
      console.error("Error cargar Misterio:", err);
      setError(true);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const resolveImageUrl = (imgPath) => {
    const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080/RestConectados";
    if (!imgPath) return placeholderImg;
    if (imgPath.startsWith("data:image") || imgPath.startsWith("blob:")) return imgPath;
    if (imgPath.startsWith("http") || imgPath.startsWith("/uploads")) return imgPath;
    return `${API_BASE}/${imgPath}`;
  };

  return (
    <div className="carousel-section">
      <div className="section-header">
        <div className="header-left">
          <span className="icon-star">★</span>
          <h2 className="section-title">Misterio</h2>
        </div>
        <a href="/libros" className="ver-mas-link">
          Ver más ›
        </a>
      </div>

      {cargando ? (
        <div className="estado-mensaje">
          <div className="spinner" />
        </div>
      ) : error ? (
        <div className="estado-mensaje">
          <p>❌ Error al cargar los libros</p>
          <button onClick={cargarLibros} className="btn-retry">
            Reintentar
          </button>
        </div>
      ) : libros.length === 0 ? (
        <div className="estado-mensaje">
          <p>No hay libros disponibles</p>
        </div>
      ) : (
        <div className="carousel-wrapper">
          <Swiper
            modules={[Navigation, Autoplay]}
            slidesPerView={2}
            spaceBetween={20}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setTimeout(() => {
                if (
                  swiper.navigation &&
                  swiper.navigation.init &&
                  prevRef.current &&
                  nextRef.current
                ) {
                  swiper.params.navigation.prevEl = prevRef.current;
                  swiper.params.navigation.nextEl = nextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }
              }, 0);
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            className="libros-swiper"
          >
            {libros.map((libro) => (
              <SwiperSlide key={libro.id}>
                <div className="libro-card">
                  <div className="libro-image-wrapper">
                    <img
                      src={resolveImageUrl(libro.portadaUrl)}
                      alt={libro.titulo}
                      className="libro-image"
                      onError={(e) => (e.currentTarget.src = placeholderImg)}
                    />
                    {libro.descuento > 0 && (
                      <div className="badge-descuento">-{libro.descuento}%</div>
                    )}
                    {libro.nuevo && (
                      <div className="badge-nuevo">Novedades</div>
                    )}
                  </div>

                  <div className="libro-info">
                    <h3 className="libro-titulo">{libro.titulo}</h3>
                    <p className="libro-autor">
                      {libro.autor?.nombre ?? ""}
                    </p>

                    <div className="libro-precios">
                      <span className="precio-actual">
                        S/{" "}
                        {(
                          Number(libro.precio || 0) *
                          (1 - Number(libro.descuento || 0) / 100)
                        ).toFixed(2)}
                      </span>
                      {libro.descuento > 0 && (
                        <>
                          <span className="precio-original">
                            S/ {Number(libro.precio || 0).toFixed(2)}
                          </span>
                          <span className="badge-porcentaje">
                            -{libro.descuento}%
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button ref={prevRef} className="custom-prev nav-button">
            ‹
          </button>
          <button ref={nextRef} className="custom-next nav-button">
            ›
          </button>
        </div>
      )}
    </div>
  );
}
