// import { Link } from "react-router-dom"; 
// import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="bg-gradient-to-r from-blue-500 to-blue-900 text-white mt-20">
//       <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-4 gap-8">

//         {/* COMPANY */}
//         <div>
//           <h3 className="font-bold text-lg mb-4 tracking-wide">Company</h3>
//           <ul className="space-y-2 text-gray-200">
//             <li>
//               <Link to="/about" className="hover:text-white hover:underline transition">
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:text-white hover:underline transition">
//                 Careers
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:text-white hover:underline transition">
//                 Blog
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:text-white hover:underline transition">
//                 Press
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* LEGAL */}
//         <div>
//           <h3 className="font-bold text-lg mb-4 tracking-wide">Legal</h3>
//           <ul className="space-y-2 text-gray-200">
//             <li>
//               <Link to="/" className="hover:text-white hover:underline transition">
//                 Terms of Service
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:text-white hover:underline transition">
//                 Privacy Policy
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:text-white hover:underline transition">
//                 Cookie Policy
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* SUPPORT */}
//         <div>
//           <h3 className="font-bold text-lg mb-4 tracking-wide">Support</h3>
//           <ul className="space-y-2 text-gray-200">
//             <li>
//               <Link to="/" className="hover:text-white hover:underline transition">
//                 Help Center
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:text-white hover:underline transition">
//                 Contact Us
//               </Link>
//             </li>
//             <li>
//               <Link to="/" className="hover:text-white hover:underline transition">
//                 FAQs
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* SOCIALS */}
//         <div>
//           <h3 className="font-bold text-lg mb-4 tracking-wide">Socials</h3>
//           <div className="flex space-x-4">
//             <Link
//               to="/"
//               className="p-2 bg-white/10 rounded-full hover:bg-white/30 transition"
//             >
//               <Twitter size={24} className="text-white" />
//             </Link>
//             <Link
//               to="/"
//               className="p-2 bg-white/10 rounded-full hover:bg-white/30 transition"
//             >
//               <Facebook size={24} className="text-white" />
//             </Link>
//             <Link
//               to="/"
//               className="p-2 bg-white/10 rounded-full hover:bg-white/30 transition"
//             >
//               <Instagram size={24} className="text-white" />
//             </Link>
//             <Link
//               to="/"
//               className="p-2 bg-white/10 rounded-full hover:bg-white/30 transition"
//             >
//               <Linkedin size={24} className="text-white" />
//             </Link>
//           </div>
//         </div>

//       </div>

//       <div className="border-t border-white/20 mt-8 pt-4 text-center text-white/70 text-sm">
//         &copy; {new Date().getFullYear()} Upperclass AI. All rights reserved.
//       </div>
//     </footer>
//   );
// }



import { useTheme } from "./context/ThemeContext";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`mt-20 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-gradient-to-r from-blue-500 to-blue-900 text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-4 gap-8">

        {/* COMPANY */}
        <div>
          <h3 className="font-bold text-lg mb-4 tracking-wide">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:underline transition">
                About Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline transition">
                Careers
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline transition">
                Blog
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline transition">
                Press
              </a>
            </li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="font-bold text-lg mb-4 tracking-wide">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline transition">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-bold text-lg mb-4 tracking-wide">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline transition">
                Help Center
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline transition">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* SOCIALS */}
        <div>
          <h3 className="font-bold text-lg mb-4 tracking-wide">Socials</h3>
          <div className="flex space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-transform hover:scale-110"
              style={{
                backgroundColor:
                  theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.1)",
              }}
            >
              <Twitter size={24} className={theme === "dark" ? "text-gray-200" : "text-white"} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-transform hover:scale-110"
              style={{
                backgroundColor:
                  theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.1)",
              }}
            >
              <Facebook size={24} className={theme === "dark" ? "text-gray-200" : "text-white"} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-transform hover:scale-110"
              style={{
                backgroundColor:
                  theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.1)",
              }}
            >
              <Instagram size={24} className={theme === "dark" ? "text-gray-200" : "text-white"} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-transform hover:scale-110"
              style={{
                backgroundColor:
                  theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.1)",
              }}
            >
              <Linkedin size={24} className={theme === "dark" ? "text-gray-200" : "text-white"} />
            </a>
          </div>
        </div>

      </div>

      <div
        className={`border-t mt-8 pt-4 text-center text-sm ${
          theme === "dark" ? "border-gray-700 text-gray-400" : "border-white/20 text-white/70"
        }`}
      >
        &copy; {new Date().getFullYear()} Upperclass AI. All rights reserved.
      </div>
    </footer>
  );
}
