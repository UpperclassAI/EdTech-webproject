"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar";
import Footer from "../footer";
import { FaComments } from "react-icons/fa";

import { Mail, Phone, MapPin, Send, CheckCircle, XCircle } from "lucide-react";

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
  const [status, setStatus] = useState(null); // success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // simulate API / Email service
    setTimeout(() => {
      const success = Math.random() > 0.2; // demo logic
      setStatus(success ? "success" : "error");
      setLoading(false);
      if (success) e.target.reset();
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 relative">
      <Navbar />

      {/* HERO */}
      <section className="relative text-white py-40 bg-[url('/assets/ccon.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-[1px]" />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Get In Touch
          </h1>
          <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
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
        <div className="max-w-6xl mx-auto bg-white rounded-3xl border-b-[6px] border-blue-600 shadow-xl p-8 md:p-16">
          <div className="grid md:grid-cols-2 gap-16">

            {/* LEFT INFO */}
            <motion.div variants={stagger} initial="hidden" whileInView="visible">
              <h2 className="text-4xl font-bold text-blue-600 mb-6">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-10 max-w-md">
                Reach out to Upperclass AI for collaborations or support.
              </p>

              <div className="space-y-6">
                <InfoItem icon={<Mail />} title="Email" value="hello@upperclass.ai" />
                <InfoItem icon={<Phone />} title="Phone" value="+234 800 000 0000" />
                <InfoItem icon={<MapPin />} title="Location" value="Remote • Global" />
              </div>
            </motion.div>

            {/* RIGHT FORM */}
            <motion.form
              onSubmit={handleSubmit}
              variants={fadeUp}
              className="bg-gray-50 rounded-3xl p-10 space-y-6 relative"
            >
              <Input label="Full Name" type="text" name="name" />
              <Input label="Email Address" type="email" name="email" />
              <Textarea label="Message" name="message" />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 transition disabled:opacity-60"
              >
                {loading ? "Sending..." : <>Send Message <Send size={18} /></>}
              </button>

              {/* SUCCESS / ERROR */}
              <AnimatePresence>
                {status && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mt-4 flex items-center gap-2 text-sm font-medium ${
                      status === "success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {status === "success" ? (
                      <>
                        <CheckCircle size={18} />
                        Message sent successfully!
                      </>
                    ) : (
                      <>
                        <XCircle size={18} />
                        Something went wrong. Try again.
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </div>
        </div>
      </motion.section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-indigo-900 text-white mt-24 text-center">
        <h3 className="text-4xl font-extrabold mb-6">
          Let’s Build Something Great
        </h3>
        <p className="text-blue-100 max-w-2xl mx-auto mb-10">
          Upperclass AI is ready to collaborate with you.
        </p>
      </section>

    {/* FLOATING CHAT BUTTON */}
<a
  href="https://wa.me/2348000000000"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full 
             bg-blue-600 hover:bg-blue-700 
             flex items-center justify-center 
             shadow-xl transition hover:scale-110"
>
  <FaComments className="text-white text-2xl" />
</a>


      <Footer />
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function InfoItem({ icon, title, value }) {
  return (
    <motion.div variants={fadeUp} className="flex gap-4">
      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-500 text-sm">{value}</p>
      </div>
    </motion.div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <input
        required
        {...props}
        className="w-full mt-2 p-4 bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none transition"
      />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-600">{label}</label>
      <textarea
        required
        rows="5"
        {...props}
        className="w-full mt-2 p-4 bg-transparent border-b border-gray-300 focus:border-blue-600 outline-none resize-none transition"
      />
    </div>
  );
}
