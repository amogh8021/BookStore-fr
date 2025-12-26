import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { AiOutlineHeart } from "react-icons/ai";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const BestSellers = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/book/best-sellers?limit=10")
      .then((res) => setBooks(res.data || []))
      .catch(() => toast.error("Failed to fetch bestsellers"));
  }, []);

  // ❤️ Wishlist
  const handleWishlist = async (book) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8080/api/wishlist/add?bookId=${book.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to wishlist ❤️");
    } catch {
      toast.error("Wishlist error");
    }
  };

  // 🛒 Cart
  const handleAddToCart = async (book) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/cart/add",
        { book_id: book.id, items: 1, discountPercent: 0 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Added to cart");
    } catch {
      toast.error("Try again!");
    }
  };

  if (!books.length) return null;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">🔥 Best Sellers</h2>

      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        navigation
        loop
        autoplay={{ delay: 2000 }}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {books.map((book, index) => (
          <SwiperSlide key={book.id}>
            <div className="relative bg-white border rounded-lg p-3 flex flex-col items-center h-[290px] hover:-translate-y-2 hover:shadow-xl transition">

              {/* 🏷 Bestseller badge */}
              <span className={`absolute top-2 left-2 text-white text-xs px-2 py-1 rounded ${
                index === 0 ? "bg-red-500" :
                index === 1 ? "bg-yellow-500" :
                index === 2 ? "bg-green-500" : "bg-gray-500"
              }`}>
                #{index + 1}
              </span>

              {/* ❤️ Wishlist */}
              <button
                onClick={() => handleWishlist(book)}
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-pink-500 transition"
              >
                <AiOutlineHeart className="text-red-500  text-2xl" />
              </button>

              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-28 h-36 object-cover rounded"
              />

              <h3 className="mt-2 text-sm font-medium text-center line-clamp-2">
                {book.title}
              </h3>

              <p className="mt-1 font-semibold text-[#AD7D42]">
                ₹{book.price}
              </p>

              <button
                onClick={() => handleAddToCart(book)}
                className="mt-auto bg-[#AD7D42] text-white px-3 py-1 rounded-xl hover:bg-[#8a6232] transition"
              >
                Add to Cart
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestSellers;
