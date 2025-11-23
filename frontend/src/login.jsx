import { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // clear errors while typing
    setErrors({
      email: "",
      password: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let hasError = false;
    let newErrors = { email: "", password: "" };

    // Dummy validation (replace with your backend logic)
    if (formData.email !== "example@gmail.com") {
      newErrors.email = "Email incorrect";
      hasError = true;
    }

    if (formData.password !== "12345") {
      newErrors.password = "Incorrect password";
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      console.log("Logged in:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-[480px] h-[500px]">

        <h1 className="text-xl font-bold mb-6 text-black">Log in</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-black rounded-lg mt-1"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-black  hover:border-blue-700 rounded-lg mt-1"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-black text-sm mt-5">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 underline">
            Create account
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;
