import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import book1 from "./assets/1.jpg";
import book2 from "./assets/2.jpg";
import book3 from "./assets/3.jpg";
import book4 from "./assets/4.jpg";

const bestSellers = [
  { id: 1, title: "The Alchemist", img: book1 },
  { id: 2, title: "Atomic Habits", img: book2 },
  { id: 3, title: "Rich Dad Poor Dad", img: book3 },
  { id: 4, title: "Harry Potter", img: book4 },
   { id: 1, title: "The Alchemist", img: book1 },
  { id: 2, title: "Atomic Habits", img: book2 },
  { id: 3, title: "Rich Dad Poor Dad", img: book3 },
  { id: 4, title: "Harry Potter", img: book4 },
];

const BestSellers = () => {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">🔥 Best Sellers of All Time</h2>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        loop
        navigation
        autoplay={{ delay: 2000 }}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {bestSellers.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="border rounded-lg p-3 shadow hover:shadow-lg transition flex flex-col items-center">
              <img
                src={book.img}
                alt={book.title}
                className="w-28 h-36 object-cover rounded"
              />
              <p className="mt-2 text-sm font-medium text-center text-gray-700">
                {book.title}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestSellers;
