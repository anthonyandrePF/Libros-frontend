import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./HeroSlider.css";

import sliderFiccion from "../../assets/sliderficcion.avif";
import sliderRomance from "../../assets/sliderRomance.webp";
import sliderMisterio from "../../assets/sliderMisterio.jpg";
import sliderFantasia from "../../assets/SliderFantasia.webp";
import sliderNoFiccion from "../../assets/sliderNoFiccion.avif";

const slides = [

{ key: "ficcion", title: "Ficción", desc: "Sumérgete en mundos imaginarios llenos de aventuras, romance y misterio. Descubre las mejores historias de ficción.", img: sliderFiccion, to: "/libros/categoria/ficcion", btn: "Explorar Ficción" },

  { key: "romance", title: "Romance", desc: "Historias de amor que te harán suspirar. Encuentra tu próxima lectura romántica favorita.", img: sliderRomance, to: "/libros/categoria/romance", btn: "Ver Romance" },
  { key: "misterio", title: "Misterio", desc: "Resuelve enigmas y descubre secretos ocultos. Los mejores thrillers y novelas de misterio te esperan.", img: sliderMisterio, to: "/libros/categoria/misterio", btn: "Descubrir Misterios" },
  { key: "fantasia", title: "Fantasía", desc: "Mundos mágicos, criaturas fantásticas y aventuras épicas. Deja volar tu imaginación con nuestros libros de fantasía.", img: sliderFantasia, to: "/libros/categoria/fantasia", btn: "Entrar al Reino" },
  { key: "no-ficcion", title: "No Ficción", desc: " Aprende algo nuevo cada día. Biografías, historia, ciencia y desarrollo personal te esperan.", img: sliderNoFiccion, to: "/libros/categoria/no-ficcion", btn: "Aprender Más" },
];

export default function HeroSlider() { 
  return (
    <div className="hero-slider-container">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="hero-swiper"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.key}>
            <div className={`slide-content slide-${s.key}`}>
              <img src={s.img} alt={s.title} className="slide-image" />
              <div className="slide-overlay" />
              <div className="slide-text">
                <h1 className="slide-title">{s.title}</h1>
                <p className="slide-description">{s.desc}</p>
                <Link to={s.to} className="slide-btn">
                  {s.btn}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}