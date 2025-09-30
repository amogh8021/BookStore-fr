import React, { useState } from "react";
import img from "../Components/assets/sign.gif";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email,setemail] = useState("")
  const [password,setpassword] = useState("")
  const handleSubmit = async(e)=>{
    e.preventDefault();

    const cleanedData ={
      email: email.trim(),
      password: password.trim()

    }
    try{
         const response = await axios.post("http://localhost:8080/api/v1/auth/login",cleanedData)
         console.log("the data is submitted" ,response)
         const token = response.data.token
         localStorage.setItem("token", token); 
         toast.success("login successfull")
         navigate("/Home")
    }

    catch(err){
      
       toast.error("invalid credentials")
    }
    

    const token = localStorage.getItem("token")
    if(token){
      const decoded = jwtDecode(token)
      console.log("the decoded data is", decoded)
    }



  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F4] p-8">
      <div className="flex w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-white/30 backdrop-blur-lg border border-white/20">
        
        {/* Left Content */}
        <div className="flex flex-col flex-1 p-10 gap-6 justify-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back 👋</h1>
          <p className="text-gray-600 text-sm">Login to continue to your account</p>

          <form className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Email</label>
              <input
                type="email"
                value = {email}
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
                onChange={(e)=>setpassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-white/50 focus:ring-2 focus:ring-gray-400 outline-none transition"
              />
              <div className="flex justify-end mt-1">
                <button className="text-sm text-indigo-600 hover:underline">
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="mt-2 bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition duration-300 shadow-lg"
            >
              Login
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

          {/* Redirect to SignUp */}
          <div className="last flex gap-2 mt-4 justify-center text-sm">
            <p className="text-gray-600">Don't have an account?</p>
            <button
             onClick={()=>navigate("/signup")}
             className="text-indigo-600 font-semibold hover:underline">
              Sign Up
            </button>
          </div>
        </div>

        {/* Right Image (Hidden on Mobile) */}
        <div className="hidden md:flex flex-[1.3] items-center justify-center bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-md mr-5">
          <img
            src={img}
            alt="gif"
            className="h-[65vh] object-cover drop-shadow-xl rounded-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
