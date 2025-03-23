import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner1 from "../assets/bannner2.jpg";
import banner2 from "../assets/banner3.jpg";
import banner3 from "../assets/banner4.jpg";
import banner4 from "../assets/banner5.jpg";



const Home = () => {
  

  
  

  return (

    <>

<Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="w-320 h-[400px] mt-4"
      >
        {[banner1, banner2, banner3, banner4].map((banner, index) => (
          <SwiperSlide key={index}>
            <img src={banner} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>



  



    </>
  );
};


export default Home;

