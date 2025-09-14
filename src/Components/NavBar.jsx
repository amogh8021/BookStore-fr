import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { MdArrowDropDown } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const NavBar = () => {
  const [openHam, setOpenHam] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);

  return (
    <>
      {/* Mobile Ham Menu */}
      {openHam && (
        <div className="ham-menu z-10 bg-[#FAF8F4] absolute top-16 left-0 w-full flex flex-col items-center gap-4 py-4 shadow-md transition-all duration-300 md:hidden">
          <a href="#" className="hover:text-[#AD7D42]">Home</a>
          <a href="#" className="hover:text-[#AD7D42]">Shop</a>
          <a href="#" className="hover:text-[#AD7D42]">Sale</a>
          <a href="#" className="hover:text-[#AD7D42]">About</a>
          <a href="#" className="hover:text-[#AD7D42]">Contact</a>
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
          <a href="#" className="hover:text-[#AD7D42]">Home</a>
          <div className="shop flex items-center cursor-pointer hover:text-[#AD7D42]">
            <a href="#">Shop</a>
            <MdArrowDropDown />
          </div>
          <a href="#" className="hover:text-[#AD7D42]">Sale</a>
          <a href="#" className="hover:text-[#AD7D42]">About</a>
          <a href="#" className="hover:text-[#AD7D42]">Contact</a>
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
              <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg flex flex-col w-32 py-2 z-20">
                <a href="#" className="px-4 py-2 hover:bg-gray-100">Sign Up</a>
                <a href="#" className="px-4 py-2 hover:bg-gray-100">Login</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
