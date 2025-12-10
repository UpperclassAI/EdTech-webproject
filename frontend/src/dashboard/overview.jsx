import { FiPlusSquare } from "react-icons/fi";
import { FaBookOpen, FaChartArea, FaRocket, FaStarOfLife } from "react-icons/fa";
import ChatBot from "./ChatBot";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

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
  const upcomingTasks = [
    { name: "AI Introduction", date: "Nov 16th, 8:00 AM" },
    { name: "Upperclass AI", date: "Nov 20th, 8:00 AM" },
    { name: "Prompt Crafting", date: "Dec 5th, 12:00 PM" },
  ];

  const courses = ["AI Introduction", "Prompt Crafting", "Machine Learning", "Deep Learning"];

  return (
    <div className="w-full min-h-screen bg-blue-50 p-4 md:p-6">
      <main className="flex flex-col gap-6">

        {/* FIRST ROW: HERO + PROFILE/TASKS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* HERO CARD */}
          <div className="col-span-1 md:col-span-2 bg-blue-100 rounded-xl p-4 flex justify-between items-center animate-[fadeUp_.7s_ease]">
            <div>
              <p className="text-sm font-bold">Upperclass AI</p>
              <p className="text-xs text-gray-500">We see the future</p>
            </div>
            <div className="w-16 h-12 md:w-20 md:h-14 bg-white shadow rounded flex items-center justify-center text-lg">
              ▶
            </div>
          </div>

          {/* RIGHT PROFILE + TASKS */}
          <div className="flex flex-col gap-4">
            {/* PROFILE */}
            <div className="bg-white shadow-sm border border-blue-100 p-4 rounded-xl flex flex-col items-center animate-[fadeUp_.75s_ease]">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white flex items-center justify-center font-bold shadow">
                PJ
              </div>
              <p className="mt-2 text-base md:text-lg font-semibold">Peter Josh</p>
              <p className="text-xs text-gray-500">Student</p>
              <button className="mt-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-md border border-blue-200 text-xs md:text-sm">
                Edit Profile
              </button>
            </div>

            {/* UPCOMING TASKS */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 animate-[fadeUp_.8s_ease]">
              <p className="font-semibold mb-2 text-sm">Upcoming Tasks</p>
              <div className="max-h-40 overflow-y-auto space-y-2">
                {upcomingTasks.map((task) => (
                  <div
                    key={task.name}
                    className="flex justify-between items-center bg-blue-50 hover:bg-blue-200 p-2 rounded transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-sm">
                        ●
                      </div>
                      <div>
                        <p className="text-sm font-medium">{task.name}</p>
                        <p className="text-xs text-gray-400">{task.date}</p>
                      </div>
                    </div>
                    <span className="text-blue-400 cursor-pointer">...</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI TUTOR */}
            <div className="shadow-sm border border-blue-100 animate-[fadeUp_.9s_ease]">
              <ChatBot />
            </div>

            {/* MENTOR */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex items-center gap-3 animate-[fadeUp_1s_ease]">
              <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                👥
              </div>
              <p className="text-sm">Connect with Mentor</p>
            </div>
          </div>
        </div>

        {/* SECOND ROW: PROGRESS + COURSES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 flex flex-col items-center animate-[fadeUp_1.1s_ease]">
            <div className="w-24 md:w-28">
              <CircularProgressbar
                value={82}
                text={"82%"}
                strokeWidth={9}
                styles={buildStyles({
                  pathColor: "#1e40af",
                  textColor: "#1e40af",
                  trailColor: "#e5e7eb",
                })}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">Overall Progress</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 animate-[fadeUp_1.15s_ease]">
            <p className="font-semibold mb-3">Courses</p>
            <ul className="space-y-3">
              {courses.map((c) => (
                <li key={c} className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <FaBookOpen />
                  </div>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* THIRD ROW: BAR CHART + BUTTON GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* BAR CHART */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 animate-[fadeUp_1.2s_ease]">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold">Time Spent</p>
              <select className="text-xs bg-blue-50 px-2 py-1 rounded">
                <option>Week</option>
                <option>Month</option>
              </select>
            </div>
            <div className="w-full h-48 md:h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="time" radius={[4, 4, 0, 0]} fill="#1e40af" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* BUTTON GRID */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-blue-100 grid grid-cols-1 gap-2 text-sm animate-[fadeUp_1.25s_ease]">
            {[
              { icon: <FaRocket />, text: "Start a Project" },
              { icon: <FaStarOfLife />, text: "Ongoing Courses" },
              { icon: <FiPlusSquare />, text: "New Courses" },
              { icon: <FaChartArea />, text: "View Performance" },
            ].map((btn, i) => (
              <button
                key={i}
                className="flex items-center gap-2 text-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 transition"
              >
                {btn.icon} {btn.text}
              </button>
            ))}
          </div>
        </div>

        {/* LAST ROW: LATEST SCHEDULE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-[fadeUp_1.3s_ease]">
          <div className="bg-white h-16 rounded-xl shadow-sm border border-blue-100 flex items-center justify-between px-4 animate-[fadeUp_1.35s_ease]">
            <p className="text-sm font-semibold">Latest Schedule</p>
            <button className="bg-blue-600 text-white text-xs px-4 py-1.5 rounded-lg hover:bg-blue-700 transition">
              View
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
