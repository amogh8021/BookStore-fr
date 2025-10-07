import { useState } from 'react'

import './App.css'
import NavBar from './Components/NavBar'
import HeroSection from './Components/HeroSection'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainPage from './Components/MainPage';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Pages/PrivateRoute';
import CartPage from './Pages/Cartpage';
import Wishlist from './Pages/Wishlist';
import WishlistCard from './Components/WishlistCard';
import ShopPage from './Pages/ShopPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-[#FAF8F4] min-h-screen'>
      <Router>

        <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> 
       <Routes>
        <Route path='/' element= {<MainPage/>}/>
        <Route path='home' element ={<PrivateRoute>
          <MainPage/>
        </PrivateRoute>}/>
        <Route path='/signup' element= {<SignUpPage/>}/>
        <Route path='/login' element= {<LoginPage/>}/>
        <Route path='/cart' element= {<CartPage/>}/>
        <Route path='/wishlist' element= {<Wishlist/>}/>
        <Route path='/wishlistcard' element= {<WishlistCard/>}/>
        <Route path='/shop' element= {<ShopPage/>}/>
      
       </Routes>
      </Router>
      
      </div>
    </>
  )
}

export default App
