import { FiPlusSquare } from "react-icons/fi";
import { FaBookOpen, FaChartArea, FaRocket, FaStarOfLife } from "react-icons/fa";
import ChatBot from "./ChatBot";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useTheme } from "../context/ThemeContext"; // Adjust path as needed

const data = [
  { name: "Mon", time: 4 },
  { name: "Tue", time: 3 },
  { name: "Wed", time: 5 },
  { name: "Thu", time: 2 },
  { name: "Fri", time: 6 },
  { name: "Sat", time: 4 },
  { name: "Sun", time: 3 },
];

export default function Overview() {
  const { theme } = useTheme();
  
  const upcomingTasks = [
    { name: "AI Introduction", date: "Nov 16th, 8:00 AM" },
    { name: "Upperclass AI", date: "Nov 20th, 8:00 AM" },
    { name: "Prompt Crafting", date: "Dec 5th, 12:00 PM" },
  ];

  const courses = ["AI Introduction", "Prompt Crafting", "Machine Learning", "Deep Learning"];

  return (
    <div className={`w-full min-h-screen p-4 md:p-6 transition-colors duration-300 ${
      theme === "dark" ? "bg-gray-900" : "bg-blue-50"
    }`}>
      <main className="flex flex-col gap-6">

        {/* FIRST ROW: HERO + PROFILE/TASKS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* HERO CARD */}
          <div className={`col-span-1 md:col-span-2 rounded-xl p-4 flex justify-between items-center animate-[fadeUp_.7s_ease] transition-colors duration-300 ${
            theme === "dark" 
              ? "bg-gray-800 border border-gray-700" 
              : "bg-blue-100"
          }`}>
            <div>
              <p className={`text-sm font-bold ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}>
                Upperclass AI
              </p>
              <p className={`text-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}>
                We see the future
              </p>
            </div>
            <div className={`w-16 h-12 md:w-20 md:h-14 shadow rounded flex items-center justify-center text-lg transition-colors duration-300 ${
              theme === "dark" 
                ? "bg-gray-700 text-gray-200" 
                : "bg-white"
            }`}>
              ▶
            </div>
          </div>

          {/* RIGHT PROFILE + TASKS */}
          <div className="flex flex-col gap-4">
            {/* PROFILE */}
            <div className={`shadow-sm border p-4 rounded-xl flex flex-col items-center animate-[fadeUp_.75s_ease] transition-colors duration-300 ${
              theme === "dark" 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-blue-100"
            }`}>
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold shadow">
                PJ
              </div>
              <p className={`mt-2 text-base md:text-lg font-semibold ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}>
                Peter Josh
              </p>
              <p className={`text-xs ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}>
                Student
              </p>
              <button className={`mt-2 px-3 py-1 rounded-md border text-xs md:text-sm transition-colors duration-300 ${
                theme === "dark" 
                  ? "bg-gray-700 text-gray-200 border-gray-600 hover:bg-gray-600" 
                  : "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100"
              }`}>
                Edit Profile
              </button>
            </div>

            {/* UPCOMING TASKS */}
            <div className={`p-4 rounded-xl shadow-sm border animate-[fadeUp_.8s_ease] transition-colors duration-300 ${
              theme === "dark" 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-blue-100"
            }`}>
              <p className={`font-semibold mb-2 text-sm ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}>
                Upcoming Tasks
              </p>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.name}
                    className={`flex justify-between items-center p-2 rounded transition-colors duration-300 ${
                      theme === "dark" 
                        ? "bg-gray-700 hover:bg-gray-600" 
                        : "bg-blue-50 hover:bg-blue-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm transition-colors duration-300 ${
                        theme === "dark" 
                          ? "bg-gray-600 text-blue-400" 
                          : "bg-blue-50 text-blue-600"
                      }`}>
                        ●
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}>
                          {task.name}
                        </p>
                        <p className={`text-xs ${
                          theme === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}>
                          {task.date}
                        </p>
                      </div>
                    </div>
                    <span className={`cursor-pointer ${
                      theme === "dark" ? "text-blue-400" : "text-blue-500"
                    }`}>
                      ...
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI TUTOR */}
            <div className={`shadow-sm border animate-[fadeUp_.9s_ease] transition-colors duration-300 ${
              theme === "dark" 
                ? "border-gray-700" 
                : "border-blue-100"
            }`}>
              <ChatBot />
            </div>

            {/* MENTOR */}
            <div className={`p-4 rounded-xl shadow-sm border flex items-center gap-3 animate-[fadeUp_1s_ease] transition-colors duration-300 ${
              theme === "dark" 
                ? "bg-gray-800 border-gray-700" 
                : "bg-white border-blue-100"
            }`}>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
                theme === "dark" 
                  ? "bg-gray-700 text-blue-400" 
                  : "bg-blue-50 text-blue-600"
              }`}>
                👥
              </div>
              <p className={`text-sm ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}>
                Connect with Mentor
              </p>
            </div>
          </div>
        </div>

        {/* SECOND ROW: PROGRESS + COURSES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PROGRESS CIRCLE */}
          <div className={`p-4 rounded-xl shadow-sm border flex flex-col items-center animate-[fadeUp_1.1s_ease] transition-colors duration-300 ${
            theme === "dark" 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-blue-100"
          }`}>
            <div className="w-24 md:w-28">
              <CircularProgressbar
                value={82}
                text={"82%"}
                strokeWidth={9}
                styles={buildStyles({
                  pathColor: theme === "dark" ? "#60a5fa" : "#1e40af",
                  textColor: theme === "dark" ? "#f3f4f6" : "#1e40af",
                  trailColor: theme === "dark" ? "#374151" : "#e5e7eb",
                })}
              />
            </div>
            <p className={`text-xs mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Overall Progress
            </p>
          </div>

          {/* COURSES */}
          <div className={`p-4 rounded-xl shadow-sm border animate-[fadeUp_1.15s_ease] transition-colors duration-300 ${
            theme === "dark" 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-blue-100"
          }`}>
            <p className={`font-semibold mb-3 ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}>
              Courses
            </p>
            <ul className="space-y-3">
              {courses.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    theme === "dark" 
                      ? "bg-gray-700 text-blue-400" 
                      : "bg-blue-50 text-blue-600"
                  }`}>
                    <FaBookOpen />
                  </div>
                  <span className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* THIRD ROW: BAR CHART + BUTTON GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* BAR CHART */}
          <div className={`p-4 rounded-xl shadow-sm border animate-[fadeUp_1.2s_ease] transition-colors duration-300 ${
            theme === "dark" 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-blue-100"
          }`}>
            <div className="flex justify-between items-center mb-2">
              <p className={`text-sm font-semibold ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}>
                Time Spent
              </p>
              <select className={`text-xs px-2 py-1 rounded transition-colors duration-300 ${
                theme === "dark" 
                  ? "bg-gray-700 text-gray-200 border-gray-600" 
                  : "bg-blue-50 text-gray-800 border-blue-200"
              }`}>
                <option>Week</option>
                <option>Month</option>
              </select>
            </div>
            <div className="w-full h-48 md:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke={theme === "dark" ? "#4b5563" : "#e5e7eb"} 
                  />
                  <XAxis 
                    dataKey="name" 
                    stroke={theme === "dark" ? "#9ca3af" : "#6b7280"} 
                  />
                  <YAxis 
                    stroke={theme === "dark" ? "#9ca3af" : "#6b7280"} 
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                      borderColor: theme === "dark" ? "#4b5563" : "#d1d5db",
                      color: theme === "dark" ? "#f3f4f6" : "#111827",
                      borderRadius: '8px',
                    }}
                  />
                  <Bar 
                    dataKey="time" 
                    radius={[4, 4, 0, 0]} 
                    fill={theme === "dark" ? "#3b82f6" : "#1e40af"} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* BUTTON GRID */}
          <div className={`p-4 rounded-xl shadow-sm border grid grid-cols-1 gap-2 text-sm animate-[fadeUp_1.25s_ease] transition-colors duration-300 ${
            theme === "dark" 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-blue-100"
          }`}>
            {[
              { icon: <FaRocket />, text: "Start a Project" },
              { icon: <FaStarOfLife />, text: "Ongoing Courses" },
              { icon: <FiPlusSquare />, text: "New Courses" },
              { icon: <FaChartArea />, text: "View Performance" },
            ].map((btn, i) => (
              <button
                key={i}
                className={`flex items-center gap-2 font-medium py-2 px-3 rounded-lg transition-colors duration-300 ${
                  theme === "dark" 
                    ? "text-blue-400 hover:bg-gray-700" 
                    : "text-blue-600 hover:bg-blue-50"
                }`}
              >
                {btn.icon} {btn.text}
              </button>
            ))}
          </div>
        </div>

        {/* LAST ROW: LATEST SCHEDULE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fadeUp_1.3s_ease]">
          <div className={`h-16 rounded-xl shadow-sm border flex items-center justify-between px-4 animate-[fadeUp_1.35s_ease] transition-colors duration-300 ${
            theme === "dark" 
              ? "bg-gray-800 border-gray-700" 
              : "bg-white border-blue-100"
          }`}>
            <p className={`text-sm font-semibold ${
              theme === "dark" ? "text-gray-100" : "text-gray-800"
            }`}>
              Latest Schedule
            </p>
            <button className={`text-xs px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors duration-300 ${
              theme === "dark" 
                ? "bg-blue-700 text-white hover:bg-blue-600" 
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}>
              View
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}