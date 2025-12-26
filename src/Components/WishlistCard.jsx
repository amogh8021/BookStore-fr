import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import NavBar from './NavBar';

const WishlistCard = ({ book, remove }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (bookId) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.delete(
        `http://localhost:8080/api/wishlist/delete?bookId=${bookId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log(response.data); 
      toast.success(response.data);
      remove(bookId); // remove from UI
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove book from wishlist.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/cart/add",
        {
          book_id: bookId,
          items: 1,
          
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to cart successfully");
    } catch (err) {
      console.error(err);
      toast.error("Try again!");
    }
  };
 


  return (
  
    <div className='bg-white shadow-md rounded-2xl overflow-hidden flex flex-col md:flex-row gap-4 md:gap-6 p-4 hover:shadow-xl transition-shadow duration-300'>
      <div className="img flex-shrink-0">
        <img 
          src={book.imageUrl || "/default.jpg"} 
          alt={book.title} 
          className='w-full md:w-32 h-40 md:h-48 object-cover rounded-2xl'
        />
      </div>

      <div className="content flex flex-col justify-between flex-1">
        <div>
          <h1 className='font-bold text-xl text-gray-800'>{book.title}</h1>
          <h2 className='text-green-600 font-semibold mt-1'>₹{book.price}</h2>
          <p className='text-gray-600 mt-2 line-clamp-3'>{book.description}</p>
        </div>


        <div className="flex align-center justify-between">
     <button 
          onClick={() => handleClick(book.id)}
          disabled={loading}
          className='mt-3 self-start bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition-colors duration-200'
        >
          {loading ? "Removing..." : "Remove"}
        </button>
        <button
        onClick={()=>handleAddToCart(book.id)}
         className='mt-3 self-start bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition-colors duration-200'
        >
       AddToCart
        </button> 

        </div>

        
      </div>
    </div>
    
    
  );
};

export default WishlistCard;
