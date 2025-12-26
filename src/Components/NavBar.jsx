// src/components/NavBar.js
import React, { useState, useEffect, useRef } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { CiShoppingCart, CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const NavBar = () => {
  const [openHam, setOpenHam] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  const [userInitial, setUserInitial] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const email = decoded.sub; // backend should send email/username in 'sub'
        setUserInitial(email.charAt(0).toUpperCase());
      } catch (err) {
        setUserInitial(null);
      }
    } else {
      setUserInitial(null);
    }
  };

  // Check token on mount + listen to login/logout events
  useEffect(() => {
    checkToken();
    window.addEventListener("login", checkToken);
    window.addEventListener("logout", checkToken);

    // Close dropdown if clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenAcc(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("login", checkToken);
      window.removeEventListener("logout", checkToken);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("logout"));
    setOpenAcc(false);
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Hamburger Menu */}
      {openHam && (
        <div className="ham-menu z-10 bg-[#FAF8F4] absolute top-16 left-0 w-full flex flex-col items-center gap-4 py-4 shadow-md transition-all duration-300 md:hidden">
          <Link to="/" className="hover:text-[#AD7D42] transition duration-300 text-gray-600">Home</Link>
          <Link to="/shop" className="hover:text-[#AD7D42] transition duration-300 text-gray-600">Shop</Link>
         
          <Link to="/about" className="hover:text-[#AD7D42] transition duration-300 text-gray-600">About</Link>
          <Link to="/wishlist" className="hover:text-[#AD7D42] transition duration-300 text-gray-600">Wishlist</Link>
          <Link to="/cart" className="hover:text-[#AD7D42] transition duration-300 text-gray-600">My Cart</Link>
        </div>
      )}

      {/* Navbar */}
      <div className="nav flex items-center justify-between h-16 px-6 relative bg-white shadow-md">
        {/* Logo */}
        <Link to="/" className="font-bold text-lg">Logo</Link>

        {/* Hamburger (mobile) */}
        <button onClick={() => setOpenHam(!openHam)} className="md:hidden">
          <GiHamburgerMenu className="text-2xl" />
        </button>

        {/* Middle menu (desktop) */}
        <div className="hidden md:flex justify-center items-center gap-10">
          <Link to="/" className="hover:text-[#AD7D42] transition duration-300 text-gray-600">Home</Link>
          <Link to="/shop" className="hover:text-[#AD7D42] transition duration-300 text-gray-600">Shop</Link>
         
          <Link to="/about" className="hover:text-[#AD7D42] transition duration-300 text-gray-600">About</Link>
          <Link to="/wishlist" className="hover:text-[#AD7D42] transition duration-300 text-gray-600">Wishlist</Link>
          <Link to="/cart" className="hover:text-[#AD7D42] transition duration-300 text-gray-600">My Cart</Link>
        </div>

       

          {/* User icon / avatar + dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setOpenAcc(!openAcc)}>
              {userInitial ? (
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold cursor-pointer">
                  {userInitial}
                </div>
              ) : (
                <FaUserCircle className="text-2xl cursor-pointer" />
              )}
            </button>

            {openAcc && (
              <div className="absolute right-0 top-10 bg-white shadow-lg rounded-lg flex flex-col w-40 py-2 px-2 z-20 items-start gap-1">
                {userInitial ? (
                  <>
                    <Link to="/profile" className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">My Profile</Link>
                    <Link to="/cart" className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">My Orders</Link>
                    <Link to="/wishlist" className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Wishlist</Link>
                   
                    <button onClick={handleLogout} className="w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100 rounded">Logout</button>
                  </>
                ) : (
                  <>
                    <Link to="/signup" className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Sign Up</Link>
                    <Link to="/login" className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded">Login</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
     
    </>
  );
};

export default NavBar;
