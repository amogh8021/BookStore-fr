import { useState } from 'react'

import './App.css'
import NavBar from './Components/NavBar'
import HeroSection from './Components/HeroSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='bg-[#FAF8F4] min-h-screen'>
      <NavBar/>
      <HeroSection/>
      </div>
    </>
  )
}

export default App
