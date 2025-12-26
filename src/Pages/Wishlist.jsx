import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import navigation hook
import axios from 'axios';
import WishlistCard from '../Components/WishlistCard';
import NavBar from '../Components/NavBar';

const Wishlist = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:8080/api/wishlist/books", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setData(response.data);
      } catch (err) {
        console.log("Error fetching wishlist:", err);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = (bookId) => {
    setData(prev => prev.filter(book => book.id !== bookId));
  };

  const handleExplore = () => {
    navigate('/shop'); 
  };

  return (
    <>
   
      <NavBar />
   
    <div className='p-6 md:p-12 bg-gray-100 min-h-screen'>
      {/* Heading */}
      <h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-6'>My Wishlist</h1>

      {/* Cards container */}
      {data.length === 0 ? (
        <div className='flex flex-col items-center justify-center mt-20 gap-4'>
          <p className='text-gray-500 text-lg'>Your wishlist is empty! Explore books to add here.</p>
          <button 
            onClick={handleExplore}
            className='bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-200'
          >
            Explore Books
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {data.map((book) => (
            <WishlistCard key={book.id} book={book} remove={handleRemove} 
            />

          ))}
        </div>
      )}
    </div>
     </>
  );
};

export default Wishlist;
