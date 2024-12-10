import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '../Stylesheets/Carrosel.css';
import ListarCarros from './ListarCarros';
import AdicionarCarro from './AdicionarCarro';

const Carrosel: React.FC = () => {
  return (
    <Swiper spaceBetween={50} slidesPerView={1}>
      <SwiperSlide>
      <div className="car-list-slide"> 
      <AdicionarCarro />
      </div>
      </SwiperSlide>

    <SwiperSlide>
      <div className="car-list-slide">
        <ListarCarros />
      </div>
    </SwiperSlide>
  </Swiper>
  );
};

export default Carrosel;
