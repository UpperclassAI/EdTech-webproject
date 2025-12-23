// import { useState } from "react";
// import { Link, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="w-full fixed mt-6 top-0 left-0 z-50 bg-transparent text-xl font-mono backdrop-blur-xs py-4">
//       <div className="max-w-7xl mx-auto px-9 py-4 flex justify-between items-center relative gap-9  ">

//         {/* LEFT — Logo */}
//         <h1 className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
//           Upperclass AI
//         </h1>

//         {/* CENTER — Desktop Menu */}
//         <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
//           <div className="flex items-center gap-15 rounded-xl px-4 py-2 shadow-md bg-white">
//             {[
//               { path: "/", label: "Home" },
//               { path: "/course", label: "Courses" },
//               { path: "/pricing", label: "Pricing" },
//                 { path: "/contact", label: "Contact" },
//               { path: "/about", label: "About" },
//             ].map((item) => (
//               <Link
//                 key={item.path}
//                 to={item.path}
//                 className={`px-5 py-3 rounded-xl transition-all duration-300
//                   ${
//                     isActive(item.path)
//                       ? "bg-blue-600 text-white scale-105 shadow"
//                       : "text-black hover:bg-blue-600 hover:text-white"
//                   }`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* RIGHT — Login */}
//         <div className="hidden md:block">
//           <Link
//             to="/auth"
//             className="px-9 py-4 bg-white text-black font-semibold rounded-xl shadow hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-105"
//           >
//             Login
//           </Link>
//         </div>

//         {/* MOBILE MENU BUTTON */}
//         <button
//           className="md:hidden text-white text-4xl transition-all duration-300 hover:scale-110"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           ☰
//         </button>
//       </div>

//       {/* MOBILE MENU — Animated */}
//       <div
//         className={`md:hidden bg-black/80 backdrop-blur-md text-white p-6 space-y-4 transform transition-all duration-300 origin-top
//           ${isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
//       >
//         {[
//             { path: "/", label: "Home" },
//               { path: "/course", label: "Courses" },
//               { path: "/pricing", label: "Pricing" },
//                 { path: "/contact", label: "Contact" },
//               { path: "/about", label: "About" },
//         ].map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className={`block text-lg transition-colors duration-300 ${
//               isActive(item.path) ? "text-blue-500" : "hover:text-blue-400"
//             }`}
//           >
//             {item.label}
//           </Link>
//         ))}

//         <Link
//           to="/auth"
//           className="w-full mt-4 px-5 py-3 bg-white text-black rounded-xl shadow font-semibold block text-center
//           transition-all duration-300 hover:bg-blue-500 hover:text-white"
//         >
//           Login
//         </Link>
//       </div>
//     </nav>
//   );
// }



import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./context/ThemeContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  /* 🌙 GLOBAL THEME */
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;

  return (
       <nav
      className={`w-full fixed mt-6 top-0 left-0 z-50
        py-4 font-mono backdrop-blur-xs transition-colors duration-300
        ${
          theme === "light"
            ? "bg-transperent/20 text-black"
            : "bg-black/10 text-gray-100"
        }`}
    >
      <div className="max-w-7xl mx-auto px-9 py-4 flex justify-between items-center relative gap-6">

        {/* LOGO */}
        <h1 className="text-2xl font-extrabold tracking-wide cursor-pointer
          text-[var(--text)] transition-transform hover:scale-105">
          Upperclass AI
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2">
          <div
            className="flex items-center gap-4 rounded-xl px-4 py-2 shadow-md
            bg-[var(--card)] border border-[var(--border)]"
          >
            {[
              { path: "/", label: "Home" },
              { path: "/course", label: "Courses" },
              { path: "/pricing", label: "Pricing" },
              { path: "/contact", label: "Contact" },
              { path: "/about", label: "About" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-3 rounded-xl transition-all duration-300
                  ${
                    isActive(item.path)
                      ? "bg-blue-600 text-white scale-105 shadow"
                      : "text-[var(--text)] hover:bg-blue-600 hover:text-white"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/auth"
            className="px-9 py-4 bg-[var(--card)] text-[var(--text)]
            font-semibold rounded-xl shadow
            hover:bg-blue-500 hover:text-white
            transition-all duration-300 hover:scale-105"
          >
            Login
          </Link>

          {/* 🌙 THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-3 rounded-xl bg-[var(--card)] shadow
            hover:scale-110 transition-all duration-300"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600" />
            )}
          </button>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-4xl text-[var(--text)]
          transition-all duration-300 hover:scale-110"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
     <div
  className={`md:hidden fixed top-[72px] left-0 w-full bg-[var(--card)]
    text-[var(--text)] backdrop-blur-md p-6 flex flex-col gap-4
    transition-all duration-300 ease-in-out
    ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
>
        {[
          { path: "/", label: "Home" },
          { path: "/course", label: "Courses" },
          { path: "/pricing", label: "Pricing" },
          { path: "/contact", label: "Contact" },
          { path: "/about", label: "About" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={`block text-lg transition-colors duration-300
              ${isActive(item.path) ? "text-blue-500" : "hover:text-blue-400"}`}
          >
            {item.label}
          </Link>
        ))}

        <Link
          to="/auth"
          className="w-full mt-4 px-5 py-3 bg-blue-600 text-white
          rounded-xl shadow font-semibold block text-center
          transition-all duration-300 hover:bg-blue-700"
        >
          Login
        </Link>

        {/* 🌙 MOBILE THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="w-full mt-3 px-5 py-3 rounded-xl bg-[var(--border)]"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
}
