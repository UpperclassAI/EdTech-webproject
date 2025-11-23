import { useState, useRef } from "react";

function Otp() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return; // allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 3) {
      inputRefs.current[index + 1].focus(); // move to next input
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");

    if (code !== "1234") {
      setError("Incorrect code. Try again.");
      return;
    }

    alert("Code verified!");
  };

  return (
    <div className="min-h-screen bg-blue-100 flex text-left items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg w-[380px] text-center">
<div className="text-left">
        <h2 className="text-xl font-bold text-black">Create an account</h2>
        <p className="text-gray-600 text-xs mb-10">Let's get started with you</p>

        <p className="text-black mb-10">
          We’ve sent a <b>4-digit verification code</b> to your gmail
        </p>
          <p className="text-gray-700 mb-10">
          Input the code.
        </p>
</div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">

          {/* OTP INPUTS */}
          <div className="flex gap-7 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-14 text-3xl text-center font-bold bg-blue-100 border-2 border-transparent
                rounded-xl focus:border-blue-500 outline-none mb-10"
              />
            ))}
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm -mt-4 mb-4">{error}</p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Confirm Code
          </button>
        </form>

        {/* RESEND */}
        <p className="text-gray-700 text-sm mt-6">
          Didn't get the code?{" "}
          <button className="text-blue-600 hover:underline">Resend</button>
        </p>
      </div>
    </div>
  );
}

export default Otp;
