import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar.jsx";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle sending the password reset email
    console.log("Reset password email sent to:", email);
    alert("If this email is registered, a password reset link will be sent.");
    navigate("/auth"); // redirect to login after submission
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4 font-mono">
      <Navbar />

      <div className="bg-white p-10 space-y-5 rounded-xl shadow-2xl w-full max-w-md flex flex-col ">
        <h1 className="text-3xl font-bold mb-4 text-left text-black my-7">Reset Password</h1>
        <p className="text-gray-700 mb-6 my-7">
         Enter the email associated with your account
             and we’ll send an email with instructions to
             reset your password
        </p>
      

        <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}> 
             <label>Email</label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 outline-none transition"
          />
          <button
            type="submit"
            className="py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        <p className="mt-6 text-gray-700">
          Remembered your password?{" "}
          <span
            onClick={() => navigate("/auth")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Log in
          </span>
        </p>
        <p className="text-center"> By continuing, you agree to the Compan’s Terms of Use and Privacy Policy</p>
      </div>
    </div>
  );
}
