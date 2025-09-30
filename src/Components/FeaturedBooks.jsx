import React from "react";
import book1 from "./assets/1.jpg";
import book2 from "./assets/2.jpg";
import book3 from "./assets/3.jpg";
import book4 from "./assets/4.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";



const featuredBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    img: book1,
    price: "$15.99",
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    img: book2,
    price: "$12.50",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    img: book3,
    price: "$10.99",
  },
  {
    id: 4,
    title: "Harry Potter",
    author: "J.K. Rowling",
    img: book4,
    price: "$25.00",
  },
];

const FeaturedBooks = () => {
  return (
    <div className="p-8">
      
      <h2 className="text-2xl font-bold mb-6 text-center">📚 Featured Books</h2>

    
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        navigation
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="w-full"
      >
        {featuredBooks.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="border rounded-lg shadow-md hover:shadow-lg transition p-4 flex flex-col items-center">
              
              <img
                src={book.img}
                alt={book.title}
                className="w-32 h-40 object-cover rounded-md"
              />

              
              <h3
                className="mt-3 text-sm font-semibold text-center text-gray-700"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {book.title}
              </h3>

              
              <p className="text-xs text-gray-500">{book.author}</p>

             
              <p className="mt-1 font-bold text-[#AD7D42]">{book.price}</p>

            
              <button className="mt-2 bg-[#AD7D42] text-white px-3 py-1 text-sm rounded hover:bg-[#8a6232] transition">
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedBooks;