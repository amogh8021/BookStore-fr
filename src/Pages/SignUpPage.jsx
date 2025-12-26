import React, { useState } from 'react';
import img from "../Components/assets/sign.gif";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // Send OTP
  const handleSendOtp = async () => {
    if(email.trim().length === 0){
      toast.error("Please enter email first");
      return;
    }
    try{
      await axios.post(`http://localhost:8080/api/v1/auth/send-otp?email=${email.trim()}`);
      toast.success("OTP sent successfully");
      setOtpSent(true);
    } catch(error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  }

  // Verify OTP
  const handleVerifyOtp = async () => {
    if(otp.trim().length === 0){
      toast.error("Please enter OTP");
      return;
    }
    try{
      await axios.post(`http://localhost:8080/api/v1/auth/verify-otp?email=${email.trim()}&otp=${otp.trim()}`);
      toast.success("Email verified successfully");
      setIsVerified(true);
    } catch(error){
      console.error(error);
      toast.error(error.response?.data?.message || "Invalid OTP");
    }
  }

  // Signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(name.trim().length===0 || email.trim().length===0 || password.trim().length===0){
      toast.error("All fields are required");
      return;
    }
    if(password.length<8){
      toast.error("Password should be minimum 8 characters");
      return;
    }
    if(!isVerified){
      toast.error("Please verify your email first");
      return;
    }
    try{
      const response = await axios.post("http://localhost:8080/api/v1/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim()
      });
      toast.success("Signup successful");
      setTimeout(()=> navigate("/login"), 1500);
    } catch(error){
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F4] p-8">
      <ToastContainer />
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
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Email</label>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  value={email}
                  placeholder="Enter your email" 
                  onChange={(e)=>setEmail(e.target.value)}
                  className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-white/50 focus:ring-2 focus:ring-gray-400 outline-none transition flex-1"
                />
                <button type="button" 
                  onClick={handleSendOtp} 
                  className="mt-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Send OTP
                </button>
              </div>
            </div>

            {/* OTP Input (conditionally shown) */}
            {otpSent && !isVerified && (
              <div className="flex flex-col">
                <label className="text-sm font-semibold text-gray-600">Enter OTP</label>
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={otp}
                    placeholder="Enter OTP"
                    onChange={(e)=>setOtp(e.target.value)}
                    className="mt-1 px-4 py-2 border border-gray-300 rounded-lg bg-white/50 focus:ring-2 focus:ring-gray-400 outline-none transition flex-1"
                  />
                  <button type="button"
                    onClick={handleVerifyOtp}
                    className="mt-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Verify OTP
                  </button>
                </div>
              </div>
            )}

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">Password</label>
              <input 
                type="password" 
                value={password}
                placeholder="Enter your password" 
                onChange={(e)=>setPassword(e.target.value)}
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

           <div className="flex gap-2 mt-4 justify-center text-sm">
            <p className="text-gray-600">Already have an account?</p>
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-600 font-semibold hover:underline"
            >
              login
            </button>
          </div>
        </div>

       

        {/* Right Image */}
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

export default SignUpPage;
