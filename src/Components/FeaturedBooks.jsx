import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { AiOutlineHeart } from "react-icons/ai";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { toast } from "react-toastify";

const FeaturedBooks = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/book/featured")
      .then((res) => setFeaturedBooks(res.data.content || []))
      .catch(() => toast.error("Unable to retrieve data"));
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
      toast.error("Already in wishlist or error");
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

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        📚 Featured Books
      </h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 2500 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {featuredBooks.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="relative bg-white border rounded-xl shadow-md p-4 m-5 flex flex-col items-center h-[340px] hover:-translate-y-2 hover:shadow-xl transition">

              {/* ❤️ Wishlist */}
              <button
                onClick={() => handleWishlist(book)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-pink-500 transition"
              >
                <AiOutlineHeart className="text-red-500 w-5 h-5" />
              </button>

              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-32 h-40 object-cover rounded-md"
              />

              <h3 className="mt-3 text-sm font-semibold text-center line-clamp-2">
                {book.title}
              </h3>

              <p className="text-xs text-gray-500">{book.author}</p>
              <p className="font-bold text-[#AD7D42]">₹{book.price}</p>

              <button
                onClick={() => handleAddToCart(book)}
                className="mt-auto bg-[#AD7D42] text-white px-4 py-1 rounded-xl hover:bg-[#8a6232] transition"
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

export default FeaturedBooks;
