import { useState } from 'react'

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white p-12 rounded-xl shadow-lg transition-all duration-300">
        
        <h1 className="text-2xl font-bold text-black">Create an account</h1>
        <p className="text-gray-600 text-xs mb-6">Let's get started with you</p>

        {/* Google Button */}
        <button className="w-full py-4 border-2 border-black rounded-xl mb-6 hover:bg-gray-100 transition flex items-center justify-center gap-3">
          <span className="text-xl font-bold text-red-500">G</span>
          Continue with Google
        </button>

        {/* OR Divider */}
        <div className="relative text-gray-600 mb-6">
          <hr />
          <span className="absolute left-1/2 -top-3 bg-white px-2 -translate-x-1/2 text-sm">
            or
          </span>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* First + Last Name */}
          <div className="grid grid-cols-2 gap-4">

            <div className="flex flex-col">
              <label className="text-sm mb-1 font-semibold text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="p-3 border-2 border-black rounded-lg focus:border-blue-500 outline-none transition"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm mb-1 font-semibold text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="p-3 border-2 border-black rounded-lg focus:border-blue-500 outline-none transition"
              />
            </div>

          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 border-2 border-black rounded-lg focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="py-3 mb-10 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Create account
          </button>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-black text-lg mt-9">
            Already have an account?{' '}
            <a href="#" className="text-blue-600 hover:underline transition">
              Log in
            </a>
          </p>

          <p className="text-gray-800 text-md mt-4">
            By continuing, you agree to the Company's Terms 
            <br/>of Use and Privacy Policy
          </p>
        </div>

      </div>
    </div>
  )
}

export default Signup
