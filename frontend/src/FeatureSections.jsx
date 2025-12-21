/* ---------------- FEATURES SECTION ---------------- */
const features = [
  {
    title: "Adaptive AI Learning",
    text: "AI-powered personalized learning paths that adjust to your pace and style.",
    icon: "🤖",
  },
  {
    title: "Global Community",
    text: "Connect with learners and mentors from around the world.",
    icon: "🌎",
  },
  {
    title: "Project-Based Skills",
    text: "Hands-on projects to build real-world experience and confidence.",
    icon: "🚀",
  },
  {
    title: "Flexible Learning",
    text: "Access content anytime, anywhere, on any device.",
    icon: "📱",
  },
];

function FeaturesSection() {
  return (
    <motion.section
      className="max-w-6xl mx-auto px-6 py-20 grid sm:grid-cols-2 md:grid-cols-4 gap-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center hover:-translate-y-2 transition-transform duration-300"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.8 }}
        >
          <div className="text-4xl mb-4">{feature.icon}</div>
          <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
          <p className="text-gray-600 text-sm sm:text-base">{feature.text}</p>
        </motion.div>
      ))}
    </motion.section>
  );
}
