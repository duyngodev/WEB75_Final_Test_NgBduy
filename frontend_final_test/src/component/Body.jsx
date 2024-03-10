import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";

const Body = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("https://web75-final-test-ngbduy.onrender.com/movies/")
      .then((res) => setData(res.data.movies))
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  return (
    <div className="bodyWrapper">
      <h2 className="popMovies">Most Popular Movies</h2>
      <Swiper
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        slidesPerView={4}
        spaceBetween={75}
        className="mySwiper">
        {data.map((movie) => {
          return (
            <SwiperSlide className="swiperSlide" key={movie._id}>
              <Card movie={movie}></Card>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Body;
