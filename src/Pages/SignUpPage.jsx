import React, { useState } from 'react'
import img from "../Components/assets/sign.gif"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const[name,setname] = useState("")
  const[email,setemail] = useState("")
  const[password,setpassword] = useState("")

  const handleSubmit = async(e)=>{
   
    e.preventDefault();

    //all field are required

     if (name.length == 0 || email.length == 0 || password.length == 0) {
      toast.error("All fields are required");
      return;
    }

    //password must be of 8 digit

    if(password.length<8){
      toast.error("password should be of minimum 8 digit")
    }


    try{

   
    const cleanedData = {
      name : name.trim(),
      email: email.trim(),
      password : password.trim()
    }


    const response = await axios.post("http://localhost:8080/api/v1/auth/register",cleanedData)

    console.log(response ,"the data is submitted")
    toast.success("signupSuccessful")

   setTimeout(() => {
        navigate("/login");
      }, 1500); 
    }
    catch (error) {
      if ( error.response.status === 409) {
        toast.error(error.response.data.message || "Email already exists");
      } else {
        console.error("Signup error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    
  };


    

  


  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F4] p-8">
      <div className="flex w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white/30 backdrop-blur-lg border border-white/20  ">
        
        {/* Left Content */}
        <div className="flex flex-col flex-1 p-10 gap-6 justify-center">
          <h1 className="text-3xl font-bold text-gray-800">Create an account</h1>

          <form className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Full Name</label>
              <input 
                type="text" 
                value={name}
                placeholder="Enter your full name" 
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-white/50 focus:ring-2 focus:ring-gray-400 outline-none transition"
               onChange={(e)=>setname(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Email</label>
              <input 
                type="email" 
                value={email}
                placeholder="Enter your email" 
                onChange={(e)=>setemail(e.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-white/50 focus:ring-2 focus:ring-gray-400 outline-none transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Password</label>
              <input 
                type="password" 
                value={password}
                placeholder="Enter your password" 
                onChange={(e)=>setpassword(e.target.value)}
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-white/50 focus:ring-2 focus:ring-gray-400 outline-none transition"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="mt-2 bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg"
              onClick={handleSubmit}
            >
              SignUp
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <hr className="flex-1 border-gray-300" />
            <span className="text-sm text-gray-500">or continue with</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-black/80 text-white py-2 rounded-lg font-semibold hover:bg-black transition duration-300 shadow-md">
              Apple
            </button>
            <button className="flex-1 bg-gray-200/70 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition duration-300 shadow-md">
              Google
            </button>
          </div>

           {/* Redirect to login */}
          <div className="last flex gap-2 mt-4 justify-center text-sm">
            <p className="text-gray-600">Already have an account?</p>
            <button className="text-indigo-600 font-semibold hover:underline"
            onClick={()=>navigate("/login")}>
              login
            </button>
          </div>
        </div>
        {/* Right Image (Hidden on Mobile) */}
        <div className="hidden md:flex flex-[1.3] items-center justify-center bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md mr-5 ] ">
          <img 
            src={img} 
            alt="gif"
            className="h-[65vh]  object-cover drop-shadow-xl rounded-3xl"
          />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
