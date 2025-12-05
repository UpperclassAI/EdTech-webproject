import { useState } from "react";
import Navbar from "../Navbar.jsx";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(false);

  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleSignupChange = (e) =>
    setSignupData({ ...signupData, [e.target.name]: e.target.value });

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted:", signupData);
  };

  const toggleLogin = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4 font-mono">
      <Navbar />
      {/* MAIN AUTH CARD */}
      <div
        className="
          relative bg-white rounded-xl overflow-hidden shadow-2xl 
          flex 
          md:flex-row 
          flex-col          
          w-full 
          max-w-sm md:max-w-[900px] 
          h-auto md:h-[600px]
        "
      >
        {/* BRANDING PANEL */}
        <div
          className={`
            bg-[#0f172a] text-white p-10 
            flex flex-col justify-center items-center
            w-full md:w-1/2 
            h-[250px] md:h-full
            transition-all duration-700 ease-in-out
          `}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-gray-800 rounded-full mb-4 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Logo</span>
            </div>

            <h1 className="text-4xl font-extrabold mb-2 text-blue-400 neon-text">
              UPPERCLASS AI
            </h1>

            <p className="text-lg">
              {isLogin
                ? "Welcome back! Please login to continue."
                : "Welcome! Join us and start learning AI."}
            </p>
          </div>
        </div>

        {/* SIGNUP PANEL */}
        <div
          className={`
            bg-white p-10 w-full md:w-1/2 
            transition-all duration-700 ease-in-out
            md:absolute md:top-0 md:left-0 md:h-full
            ${isLogin
              ? "md:-translate-x-full md:opacity-0" 
              : "md:translate-x-0 md:opacity-100"}
            ${isLogin ? "hidden md:flex" : "flex"}
            flex-col justify-center
          `}
        >
          <h1 className="text-2xl font-bold text-black">Create an account</h1>
          <p className="text-gray-600 text-xs mb-6">Let's get started with you</p>

          <button className="w-full py-4 border-2 border-black rounded-xl mb-6 hover:bg-gray-100 transition flex items-center justify-center gap-3">
            <span className="inline-block w-6 h-6 align-middle">
              <img src="/assets/gmail.png" alt="G" className="w-full h-full object-contain" />
            </span>
            Continue with Google
          </button>

          <div className="relative text-gray-600 mb-6">
            <hr />
            <span className="absolute left-1/2 -top-3 bg-white px-2 -translate-x-1/2 text-sm">
              or
            </span>
          </div>

          <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm mb-1 font-semibold text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={signupData.firstName}
                  onChange={handleSignupChange}
                  placeholder="Enter first name"
                  required
                  className="p-3 border-2 border-black rounded-lg focus:border-blue-500 outline-none transition"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm mb-1 font-semibold text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={signupData.lastName}
                  onChange={handleSignupChange}
                  placeholder="Enter last name"
                  required
                  className="p-3 border-2 border-black rounded-lg focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1 font-semibold text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                placeholder="example@gmail.com"
                required
                className="p-3 border-2 border-black rounded-lg focus:border-blue-500 outline-none transition"
              />
            </div>

            <button
              type="button"
              onClick={() => navigate("/auth/otp")}
              className="py-3 mb-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Create account
            </button>
          </form>

          <p className="text-center text-black text-lg mt-3">
            Already have an account?{" "}
            <span
              onClick={toggleLogin}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </div>

        {/* LOGIN PANEL */}
        <div
          className={`
            bg-white p-10 w-full md:w-1/2  
            flex flex-col justify-center
            transition-all duration-700 ease-in-out
            md:absolute md:top-0 md:left-1/2 md:h-full
            ${isLogin 
              ? "md:translate-x-0 md:opacity-100" 
              : "md:translate-x-full md:opacity-0"}
            ${isLogin ? "flex" : "hidden md:flex"}
          `}
        >
          <h1 className="text-3xl font-bold mb-4 text-black">Log In</h1>

          <form className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email Address"
              className="p-3 border-2 border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 border-2 border-gray-300 rounded-lg"
            />
         
            <button
              type="button"
               onClick={() => navigate("/dashboard/overview")}
              className="py-3 mb-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              log in
            </button>
          </form>

          <p className="mt-6 text-gray-700 text-center">
            Don't have an account?{" "}
            <span
              onClick={toggleLogin}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Create account
            </span>
          </p>

          {/* Forgotten Password */}
          <p className="mt-2 text-center text-gray-900">
           {" "}
            <span
              onClick={() => navigate("/auth/resetpassword")}
              className="text-blue-600 cursor-pointer hover:underline"
            >
               Forgotten Password?
            </span>
          </p>
        </div>

        <style jsx>{`
          .neon-text {
            text-shadow: 0 0 5px #00f, 0 0 10px #00f, 0 0 20px #00f,
              0 0 40px #0ff, 0 0 80px #0ff;
          }
        `}</style>
      </div>
    </div>
  );
}
