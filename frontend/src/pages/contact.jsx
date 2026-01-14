"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { FaComments } from "react-icons/fa";
import { Mail, Phone, MapPin, Send, CheckCircle, XCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/* ---------------- ANIMATION VARIANTS ---------------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Get form data
    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
      access_key: "8cd2483d-46b0-47b8-8dd0-924fe30220e9",
      subject: "New Contact Form Submission - Upperclass AI",
      from_name: "Upperclass AI Website",
      botcheck: "" // Empty for bot check
    };

    console.log("Form data:", formData); // Debug log

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Web3Forms response:", data); // Debug log

      if (data.success) {
        setStatus("success");
        form.reset(); // Clear form on success
      } else {
        console.error("Web3Forms Error:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Network Error:", error);
      setStatus("error");
    } finally {
      setLoading(false);
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setStatus(null);
      }, 5000);
    }
  };

  return (
    <div
      className={`w-full min-h-screen transition-colors ${
        theme === "dark" ? "bg-slate-950 text-gray-200" : "bg-gray-50 text-gray-900"
      } relative`}
    >
      <Navbar />

      {/* HERO */}
      <section
        className={`relative py-40 bg-[url('/assets/ccon.png')] bg-cover bg-center transition-colors`}
      >
        <div
          className={`absolute inset-0 ${
            theme === "dark" ? "bg-black/80" : "bg-blue-900/80"
          } backdrop-blur-[1px]`}
        />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <h1 className="text-5xl text-white md:text-6xl font-extrabold leading-tight">
            Get In Touch
          </h1>
          <p className={`mt-6 text-lg ${theme === "dark" ? "text-gray-300" : "text-blue-100"}`}>
            Have a question, partnership idea, or just want to say hello?
          </p>
        </motion.div>
      </section>

      {/* CONTACT CARD */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="-mt-20 relative z-10"
      >
        <div
          className={`max-w-6xl mx-auto rounded-3xl border-b-[6px] border-blue-600 shadow-xl p-8 md:p-16 transition-colors ${
            theme === "dark" ? "bg-slate-900" : "bg-white"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-16">
            {/* LEFT INFO */}
            <motion.div variants={stagger} initial="hidden" whileInView="visible">
              <h2 className={`text-4xl font-bold mb-6 ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                Contact Information
              </h2>
              <p className={`mb-10 max-w-md ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Reach out to Upperclass AI for collaborations or support.
              </p>
              <div className="space-y-6">
                <InfoItem icon={<Mail />} title="Email" value="upperclassai@gmail.com" theme={theme} />
                <InfoItem icon={<Phone />} title="Phone" value="+234-814 1174 675" theme={theme} />
                <InfoItem icon={<MapPin />} title="Location" value="Remote • Global" theme={theme} />
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <form
              onSubmit={handleSubmit}
              className={`rounded-3xl p-10 space-y-6 transition-colors ${
                theme === "dark" ? "bg-slate-800" : "bg-gray-50"
              }`}
            >
              {/* Web3Forms Hidden Fields */}
              <input type="hidden" name="access_key" value="8cd2483d-46b0-47b8-8dd0-924fe30220e9" />
              <input type="hidden" name="subject" value="New Contact Form Submission - Upperclass AI" />
              <input type="hidden" name="from_name" value="Upperclass AI Website" />
              
              {/* Honeypot field - should be invisible to humans */}
              <div style={{ opacity: 0, position: "absolute", top: 0, left: 0, height: 0, width: 0, zIndex: -1 }}>
                <input type="text" name="botcheck" defaultValue="" />
              </div>
              
              <Input label="Full Name" type="text" name="name" theme={theme} />
              <Input label="Email Address" type="email" name="email" theme={theme} />
              <Textarea label="Message" name="message" theme={theme} />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg 
                      className="animate-spin h-5 w-5 mr-2" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>

              {/* SUCCESS / ERROR MESSAGES */}
              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
                      status === "success"
                        ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800"
                        : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800"
                    }`}
                  >
                    {status === "success" ? (
                      <>
                        <CheckCircle size={20} className="mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Message sent successfully!</p>
                          <p className="text-sm mt-1 opacity-80">
                            Thank you for contacting Upperclass AI. We'll get back to you soon.
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <XCircle size={20} className="mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold">Failed to send message</p>
                          <p className="text-sm mt-1 opacity-80">
                            Please try again or contact us directly via email.
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Debug info - remove in production */}
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                <p>Form debug: Check console for submission details</p>
              </div>
            </form>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <section
        className={`py-24 mt-24 text-center transition-colors ${
          theme === "dark"
            ? "bg-slate-900 text-gray-200"
            : "bg-gradient-to-br from-blue-900 to-indigo-900 text-white"
        }`}
      >
        <h3 className="text-4xl font-extrabold mb-6">Let's Build Something Great</h3>
        <p className={theme === "dark" ? "text-gray-300" : "text-blue-100"}>
          Upperclass AI is ready to collaborate with you.
        </p>
        <div className="mt-8">
          <a
            href="mailto:upperclassai@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-blue-900 hover:bg-blue-50 dark:bg-blue-700 dark:text-white dark:hover:bg-blue-600 px-6 py-3 rounded-full font-semibold transition-colors"
          >
            <Mail size={18} />
            Email us directly
          </a>
        </div>
      </section>

      {/* FLOATING CHAT BUTTON */}
      <a
        href="https://wa.link/ujeev2"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition hover:scale-110 ${
          theme === "dark" ? "bg-blue-800 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        <FaComments className="text-white text-2xl" />
      </a>

      <Footer />
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function InfoItem({ icon, title, value, theme }) {
  return (
    <motion.div variants={fadeUp} className="flex gap-4">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          theme === "dark" ? "bg-blue-900/40 text-blue-400" : "bg-blue-100 text-blue-600"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className={`font-semibold ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>{title}</p>
        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{value}</p>
      </div>
    </motion.div>
  );
}

function Input({ label, theme, ...props }) {
  return (
    <div>
      <label className={`text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        {label}
      </label>
      <input
        required
        {...props}
        className={`w-full mt-2 p-4 bg-transparent border-b transition outline-none ${
          theme === "dark" 
            ? "border-gray-600 text-white focus:border-blue-400" 
            : "border-gray-300 text-gray-900 focus:border-blue-600"
        }`}
      />
    </div>
  );
}

function Textarea({ label, theme, ...props }) {
  return (
    <div>
      <label className={`text-sm font-semibold ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
        {label}
      </label>
      <textarea
        required
        rows="5"
        {...props}
        className={`w-full mt-2 p-4 bg-transparent border-b transition resize-none outline-none ${
          theme === "dark" 
            ? "border-gray-600 text-white focus:border-blue-400" 
            : "border-gray-300 text-gray-900 focus:border-blue-600"
        }`}
      />
    </div>
  );
}