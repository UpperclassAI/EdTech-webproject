import { Link } from "react-router-dom";
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
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/course" className="hover:underline">Courses</Link></li>
            <li><Link to="/" className="hover:underline">Blog</Link></li>
            <li><Link to="/" className="hover:underline">Press</Link></li>
          </ul>
        </div>

        {/* LEGAL */}
        <div>
          <h3 className="font-bold text-lg mb-4 tracking-wide">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/cookies" className="hover:underline">Cookie Policy</Link></li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-bold text-lg mb-4 tracking-wide">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/help" className="hover:underline">Help Center</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
  <li
  onClick={() => faqRef.current?.scrollIntoView({ behavior: "smooth" })}
  className="cursor-pointer hover:underline"
>
  FAQs
</li>

          </ul>
        </div>

        {/* SOCIALS (external links stay <a>) */}
        <div>
          <h3 className="font-bold text-lg mb-4 tracking-wide">Socials</h3>
          <div className="flex space-x-4">
            {[
              { Icon: Twitter, url: "https://twitter.com" },
              { Icon: Facebook, url: "https://facebook.com" },
              { Icon: Instagram, url: "https://instagram.com" },
              { Icon: Linkedin, url: "https://linkedin.com" },
            ].map(({ Icon, url }) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:scale-110 transition"
              >
                <Icon size={22} />
              </a>
            ))}
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
