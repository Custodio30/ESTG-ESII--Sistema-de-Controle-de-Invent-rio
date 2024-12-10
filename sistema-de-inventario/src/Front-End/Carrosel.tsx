import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../Stylesheets/Carrosel.css";
import ListarCarros from "./ListarCarros";
import AdicionarCarro from "./AdicionarCarro";
import Perfil from "./Perfil";

interface CarroselProps {
  slideIndex: number;
  marcaSelecionada: string;  // Adicionando marcaSelecionada como prop
  modeloSelecionado: string; // Adicionando modeloSelecionado como prop
}

const Carrosel: React.FC<CarroselProps> = ({ slideIndex, marcaSelecionada, modeloSelecionado }) => {
  const swiperRef = React.useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(slideIndex); // Força a atualização do slide
    }
  }, [slideIndex]);

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      initialSlide={slideIndex}
      ref={swiperRef}
    >
      <SwiperSlide>
        <div className="car-list-slide">
        <ListarCarros 
        marcaSelecionada={marcaSelecionada} 
        modeloSelecionado={modeloSelecionado}
        /> 
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="car-list-slide">
        <AdicionarCarro />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="car-list-slide">
          <Perfil />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carrosel;
