import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function CreatePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const passwordError =
    password.length > 0 && password.length < 8
      ? "Password must be at least 8 characters"
      : "";

  const matchError =
    confirmPassword.length > 0 && confirmPassword !== password
      ? "Passwords do not match"
      : "";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (passwordError || matchError) return;

    console.log("Password confirmed!");
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white p-12 rounded-xl shadow-lg w-[400px] transition-all duration-300">

        <h1 className="text-xl font-bold text-black mb-6">Create password</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className={`p-3 w-full border-2 rounded-lg outline-none transition 
                  ${passwordError ? "border-red-500" : "border-black focus:border-blue-500"}
                `}
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}

            <p className="text-gray-500 text-xs mt-1">Must be at least 8 characters</p>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
                className={`p-3 w-full border-2 rounded-lg outline-none transition 
                  ${matchError ? "border-red-500" : "border-black focus:border-blue-500"}
                `}
              />
              <span
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
              >
                {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {matchError && (
              <p className="text-red-500 text-xs mt-1">{matchError}</p>
            )}

            <p className="text-gray-500 text-xs mt-1">Both passwords must match</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition mt-4"
          >
            Confirm Password
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreatePassword;
