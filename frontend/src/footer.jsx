import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-100 text-black mt-20">
      <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-4 gap-8">

        {/* COMPANY */}
        <div>
          <h3 className="font-bold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/about" className="hover:text-blue-400 transition">About Us</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition">Careers</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition">Blog</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition">Press</Link></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="font-bold text-lg mb-4">Legal</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-blue-400 transition">Terms of Service</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-bold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-blue-400 transition">Help Center</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition">Contact Us</Link></li>
            <li><Link to="/" className="hover:text-blue-400 transition">FAQs</Link></li>
          </ul>
        </div>

        {/* SOCIALS */}
        <div>
          <h3 className="font-bold text-lg mb-4">Socials</h3>
          <div className="flex space-x-4 text-gray-300">
            <Link to="/" className="hover:text-blue-400 transition"><Twitter size={24} /></Link>
            <Link to="/" className="hover:text-blue-400 transition"><Facebook size={24} /></Link>
            <Link to="/" className="hover:text-blue-400 transition"><Instagram size={24} /></Link>
            <Link to="/" className="hover:text-blue-400 transition"><Linkedin size={24} /></Link>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Upperclass AI. All rights reserved.
      </div>
    </footer>
  );
}
