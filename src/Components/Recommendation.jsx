import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { IoIosArrowRoundForward } from "react-icons/io";
import books from "./booksData.json"
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import axios from 'axios';
import { useState,useEffect } from 'react';
import { toast } from "react-toastify";


const Recommendation = () => {
 
 
  const [booksData, setBooksData] = useState([]);
  const [wishlist,setwishlist] = useState([])

  const handleWishlist = async (book) => {
  try {
    const bookId = book.id;
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `http://localhost:8080/api/wishlist/add?bookId=${bookId}`,
      {}, // ✅ empty body
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ add token
        },
      }
    );

    console.log("Wishlist response:", response.data);
    toast.success("Added to wishlist");
  } catch (err) {
    console.error("Unable to add into the wishlist:", err.response || err.message);
    toast.error("Unable to add to wishlist");
  }
};


 const handleAddToCart = async (book) => {

  console.log("the add to cart btn is clicked")
  try {
    const requestBody = {
      book_id: book.id,         
      items: 1,                  
      discountPercent: 0        
    };
   const token = localStorage.getItem("token")
    const response = await axios.post(
      "http://localhost:8080/cart/add",
      requestBody,
      
      {
        headers: {
          "Content-Type": "application/json",
          // If backend needs JWT:
          Authorization : `Bearer ${token}`
        }
      }
    );

    console.log("Added to cart:", response.data);
    toast.success("added to cart successfully")
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("try again !")
  }
};
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/book/list");
        
        setBooksData(response.data); 
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  
  return (
  <div className="recommendation-section p-8">

      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold mb-4">Recommendation for you</h1>
      <button
            
            className="hidden text-[#AD7D42] border border-[#AD7D42] px-4 py-2 rounded-2xl md:flex items-center gap-2 hover:bg-[#AD7D42] hover:text-white transition"
          >
            View All <IoIosArrowRoundForward className="text-2xl" />
          </button>

      </div>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
      
        loop={true}
        autoplay={{ delay: 1000, disableOnInteraction: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="w-full"
      >
        {booksData.map((book) => {
          
          return (
            <SwiperSlide key={book.id}>
              <div className="border-2 w-60 h-auto mx-auto rounded-xl shadow-md p-3 flex flex-col items-center flex-shrink-0 mt-2">
               
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-56 object-cover rounded-md "
                  loading='lazy'
                />
                <h2 className="mt-2 text-center text-xl font-medium text-gray-700 line-clamp-1">
                  {book.title}
                </h2>
                <h3> ₹ {book.price}</h3>

                <div className="absolute top-2 right-2 flex flex-col gap-2">
 
  <button
    className="bg-white p-2 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-135 hover:bg-pink-500"
  >
    <AiOutlineHeart className="w-5 h-5 text-red-500 group-hover:text-white transition-colors duration-300" 
    onClick={()=>handleWishlist(book)}/>
  </button>

 
  <button
    className="bg-white p-2 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-135 hover:bg-blue-500"
  >
    <FiShare2 className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors duration-300" />
  </button>
</div>

                 <button
          className="bg-[#AD7D42] mt-4 h-10 w-40 text-white rounded-2xl 
                     hover:bg-[#8c6333] hover:scale-105 transition-all duration-300 shadow-md"
                     onClick={()=>handleAddToCart(book)}
        >
          Add to cart
        </button>
              </div>
            </SwiperSlide>
            
          );
        })}
      </Swiper>

       <button className="  flex items-center  justify-center bg-[#AD7D42] h-10 w-full text-white p-5 align-middle rounded-2xl tracking-wide leading-tight mt-6 md:hidden">
            View All <IoIosArrowRoundForward className="ml-2 text-2xl" />
          </button>
    </div>
  )
}

export default Recommendation
