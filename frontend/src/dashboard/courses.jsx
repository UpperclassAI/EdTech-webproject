"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, Box, CheckCircle } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/* ================= DATA ================= */

const courses = [
  // AI
  { title: "Prompt Crafting", tech: "AI", sections: 46, progress: 45, locked: false },
  { title: "AI Ethics", tech: "AI", sections: 18, progress: 100, locked: false },
  { title: "AI Fundamentals", tech: "AI", sections: 32, progress: 70, locked: false },
  { title: "AI Automation", tech: "AI", sections: 24, progress: 0, locked: true },
  { title: "Generative AI", tech: "AI", sections: 36, progress: 0, locked: true },
  // ML
  { title: "Machine Learning", tech: "ML", sections: 60, progress: 35, locked: false },
  { title: "Supervised Learning", tech: "ML", sections: 22, progress: 0, locked: false },
  { title: "Unsupervised Learning", tech: "ML", sections: 26, progress: 0, locked: true },
  { title: "Reinforcement Learning", tech: "ML", sections: 34, progress: 0, locked: true },
  { title: "ML Mathematics", tech: "ML", sections: 40, progress: 0, locked: true },
  // Web
  { title: "HTML & CSS", tech: "Web", sections: 40, progress: 100, locked: false },
  { title: "JavaScript Mastery", tech: "Web", sections: 55, progress: 60, locked: false },
  { title: "Web Accessibility", tech: "Web", sections: 20, progress: 0, locked: false },
  { title: "Web Performance", tech: "Web", sections: 22, progress: 0, locked: true },
  { title: "SEO for Developers", tech: "Web", sections: 18, progress: 0, locked: true },
  // Frontend
  { title: "Frontend Fundamentals", tech: "Frontend", sections: 32, progress: 20, locked: false },
  { title: "React Fundamentals", tech: "Frontend", sections: 48, progress: 25, locked: false },
  { title: "Next.js Mastery", tech: "Frontend", sections: 42, progress: 0, locked: true },
  { title: "State Management", tech: "Frontend", sections: 28, progress: 0, locked: true },
  { title: "Frontend Testing", tech: "Frontend", sections: 24, progress: 0, locked: true },
  // UIUX
  { title: "UI/UX Fundamentals", tech: "UIUX", sections: 30, progress: 40, locked: false },
  { title: "Design Thinking", tech: "UIUX", sections: 24, progress: 0, locked: false },
  { title: "User Research", tech: "UIUX", sections: 20, progress: 0, locked: false },
  { title: "Figma for Designers", tech: "UIUX", sections: 36, progress: 0, locked: true },
  { title: "Design Systems", tech: "UIUX", sections: 26, progress: 0, locked: true },
  // Backend
  { title: "Backend Fundamentals", tech: "Backend", sections: 28, progress: 0, locked: true },
  { title: "Node.js", tech: "Backend", sections: 38, progress: 0, locked: true },
  { title: "Databases", tech: "Backend", sections: 30, progress: 0, locked: true },
  { title: "REST APIs", tech: "Backend", sections: 26, progress: 0, locked: true },
  { title: "GraphQL APIs", tech: "Backend", sections: 24, progress: 0, locked: true },
  // Mobile
  { title: "Mobile App Basics", tech: "Mobile", sections: 28, progress: 0, locked: true },
  { title: "React Native", tech: "Mobile", sections: 44, progress: 0, locked: true },
  { title: "Flutter Fundamentals", tech: "Mobile", sections: 40, progress: 0, locked: true },
  { title: "Mobile UI Design", tech: "Mobile", sections: 22, progress: 0, locked: true },
  { title: "Mobile Security", tech: "Mobile", sections: 18, progress: 0, locked: true },
  // Data Science
  { title: "Data Science Fundamentals", tech: "Data Science", sections: 30, progress: 0, locked: true },
  { title: "Python for Data Science", tech: "Data Science", sections: 35, progress: 0, locked: true },
  { title: "Statistics & Probability", tech: "Data Science", sections: 28, progress: 0, locked: true },
  { title: "Machine Learning Basics", tech: "Data Science", sections: 40, progress: 0, locked: true },
  { title: "Data Visualization", tech: "Data Science", sections: 25, progress: 0, locked: true },
  { title: "Big Data & Analytics", tech: "Data Science", sections: 32, progress: 0, locked: true },
];

const techFilters = ["All", "AI", "ML", "Web", "Frontend", "UIUX", "Backend","Data Science", "Mobile"];
const statusFilters = ["all", "progress", "completed", "locked"];

/* ================= COMPONENT ================= */

export default function CoursesOverview() {
  const { theme } = useTheme();
  const [activeTech, setActiveTech] = useState("All");
  const [status, setStatus] = useState("all");

  const cardBg = theme === "dark" ? "bg-slate-800 text-gray-200" : "bg-white text-gray-900";
  const pageBg = theme === "dark" ? "bg-slate-900" : "bg-blue-50";
  const ongoingBg = theme === "dark" ? "bg-slate-700" : "bg-gray-100";

  // Filtered courses based on tech & status
  const filteredCourses = courses.filter((c) => {
    if (activeTech !== "All" && c.tech !== activeTech) return false;
    if (status === "progress") return c.progress > 0 && c.progress < 100;
    if (status === "completed") return c.progress === 100;
    if (status === "locked") return c.locked;
    return true;
  });

  // Filtered ongoing courses based on same filters
  const ongoing = filteredCourses.filter((c) => c.progress > 0);

  return (
    <section className={`${pageBg} py-16`}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[2fr_1fr] gap-10">

        {/* LEFT – Courses */}
        <div>

          {/* TECH FILTER */}
          <div className="flex flex-wrap gap-2 mb-4">
            {techFilters.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTech(t)}
                className={`px-4 py-1.5 text-sm transition rounded-full ${
                  activeTech === t
                    ? "bg-blue-600 text-white"
                    : theme === "dark"
                    ? "bg-slate-700 text-gray-200 hover:bg-blue-500 hover:text-white"
                    : "bg-gray-200 text-gray-900 hover:bg-blue-300 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* STATUS FILTER */}
          <div className="flex gap-2 mb-6">
            {statusFilters.map((f) => (
              <button
                key={f}
                onClick={() => setStatus(f)}
                className={`px-4 py-1.5 text-sm transition rounded-full ${
                  status === f
                    ? "bg-blue-600 text-white"
                    : theme === "dark"
                    ? "bg-slate-700 text-gray-200 hover:bg-blue-500 hover:text-white"
                    : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                }`}
              >
                {f === "all"
                  ? "All"
                  : f === "progress"
                  ? "In Progress"
                  : f === "completed"
                  ? "Completed"
                  : "Locked"}
              </button>
            ))}
          </div>

          {/* COURSES */}
          <AnimatePresence>
            {filteredCourses.map((course) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`${cardBg} rounded-2xl p-6 flex gap-6 mb-6 shadow-md hover:shadow-xl`}
              >
                <div className="w-28 h-24 rounded-xl bg-blue-200" />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-lg">{course.title}</h3>
                    {course.locked ? (
                      <Lock className="text-gray-400 w-5 h-5" />
                    ) : course.progress === 100 ? (
                      <CheckCircle className="text-green-500 w-5 h-5" />
                    ) : (
                      <Unlock className="text-blue-600 w-5 h-5" />
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    {course.sections} Sections • {course.tech}
                  </p>

                  {course.progress > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-blue-600"
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    disabled={course.locked}
                    className={`mt-4 px-4 py-2 rounded-full text-sm ${
                      course.locked
                        ? "bg-gray-300 text-gray-500"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {course.progress === 100
                      ? "Completed"
                      : course.progress > 0
                      ? "View"
                      : "Start"}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* RIGHT – Ongoing Courses */}
        <div className={`${cardBg} rounded-2xl p-6 shadow-sm`}>
          <h4 className="font-semibold mb-6">Ongoing Courses</h4>

          <div className="space-y-4">
            {ongoing.length === 0 && (
              <p className="text-sm text-gray-500">No ongoing courses</p>
            )}
            {ongoing.map((item) => (
              <div
                key={item.title}
                className={`${ongoingBg} p-3 rounded-xl transition`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Box className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{item.title}</span>
                </div>

                <div className="h-1.5 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
