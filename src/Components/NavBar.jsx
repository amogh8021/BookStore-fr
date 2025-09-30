import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { MdArrowDropDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [openHam, setOpenHam] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);

  return (
    <>
      {/* Mobile Ham Menu */}
      {openHam && (
        <div className="ham-menu z-10 bg-[#FAF8F4] absolute top-16 left-0 w-full flex flex-col items-center gap-4 py-4 shadow-md transition-all duration-300 md:hidden">
          <a href="#" className="hover:text-[#AD7D42] hover:scale-120 transform-3d transition duration-300 text-gray-600">Home</a>
          <a href="#" className="hover:text-[#AD7D42]  hover:scale-120 transform-3d transition duration-300 text-gray-600">Shop</a>
          <a href="#" className="hover:text-[#AD7D42]  hover:scale-120 transform-3d transition duration-300 text-gray-600">E-book</a>
          <a href="#" className="hover:text-[#AD7D42]  hover:scale-120 transform-3d transition duration-300 text-gray-600">About</a>
          <a href="#" className="hover:text-[#AD7D42]  hover:scale-120 transform-3d transition duration-300 text-gray-600">Wishlist</a>
          <a href="#" className="hover:text-[#AD7D42]  hover:scale-120 transform-3d transition duration-300 text-gray-600">My Cart</a>
        </div>
      )}

      {/* NavBar */}
      <div className="nav flex items-center justify-between h-16 px-6 relative">
        {/* Logo */}
        <a href="#" className="font-bold text-lg">Logo</a>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpenHam(!openHam)}
          className="md:hidden"
        >
          <GiHamburgerMenu className="text-2xl" />
        </button>

        {/* Middle menu (desktop only) */}
        <div className="hidden md:flex justify-center items-center gap-10">
          <a href="#" className="hover:text-[#AD7D42] hover:scale-120 transform-3d transition duration-300 text-gray-600">Home</a>
          <a href="#" className="hover:text-[#AD7D42]  hover:scale-120 transform-3d transition duration-300 text-gray-600">Shop</a>
          <a href="#" className="hover:text-[#AD7D42]  hover:scale-120 transform-3d transition duration-300 text-gray-600">E-book</a>
          <a href="#" className="hover:text-[#AD7D42]  hover:scale-120 transform-3d transition duration-300 text-gray-600">About</a>
          <a href="#" className="hover:text-[#AD7D42]  hover:scale-120 transform-3d transition duration-300 text-gray-600">Wishlist</a>
          <a href="#" className="hover:text-[#AD7D42]  hover:scale-120 transform-3d transition duration-300 text-gray-600">My Cart</a>
        </div>

        {/* Right side (desktop + mobile) */}
        <div className="flex items-center gap-6">
          <CiSearch className="cursor-pointer text-xl" />
          <CiShoppingCart className="cursor-pointer text-xl" />

          {/* User icon + dropdown */}
          <div className="relative">
            <button onClick={() => setOpenAcc(!openAcc)}>
              <FaUserCircle className="text-2xl cursor-pointer" />
            </button>

            {openAcc && (
              <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg flex flex-col w-32 py-2 px-2 z-20 items-center gap-4">
              <Link to ="/signup"
              >signUp</Link> 

               <Link to ="/login"
              >Login</Link>
              </div>

            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
