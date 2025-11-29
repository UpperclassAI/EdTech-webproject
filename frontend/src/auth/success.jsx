import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import { Check } from "lucide-react";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center justify-center p-4">
      {/* NAVBAR */}
      <Navbar />

      <div className="bg-white p-10 rounded-xl shadow-lg flex flex-col items-center gap-6 mt-10">
        {/* Blue Circle with Icon */}
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
          <Check size={40} className="text-white" />
        </div>

        {/* Success Text */}
        <h1 className="text-2xl font-bold text-black">Account Created</h1>
        <p className="text-gray-600">Your account has been successfully created!</p>

        {/* Back Home Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-4 py-3 px-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Back Home
        </button>
      </div>
    </div>
  );
}
