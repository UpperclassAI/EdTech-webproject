import { FiSearch, FiUser, FiChevronRight } from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { FaBox, FaRegSmile } from "react-icons/fa";
import Sidebar from "./Sidebar";
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
  { name: "Sun", time: 3 }
];
export default function Overview() {
  return (
    <div className="w-full min-h-screen font-sans text-gray-800 bg-white p-4 md:p-6 flex flex-col md:flex-row">
      
      {/* LEFT SIDEBAR */}
      <Sidebar />

      {/* MAIN DASHBOARD */}
      <main className="flex-1 md:ml-6 flex flex-col gap-6 mt-6 md:mt-0">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-medium">Welcome Peter Josh</h2>
              <div className="text-xs text-gray-500">Student</div>
            </div>

            {/* Search - responsive width */}
            <div className="relative">
              <input
                className="w-full sm:w-64 lg:w-80 pl-10 pr-4 py-2 rounded-lg bg-blue-100 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Search"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-blue-100 flex items-center justify-center">
              <FiUser className="text-blue-600 text-xl" />
            </div>
          </div>

        </div>

        {/* --- ROW 1 --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* LEFT CARD */}
          <div className="bg-blue-100 rounded-xl p-4 flex items-center justify-between col-span-1 md:col-span-2">
            <div>
              <div className="text-sm font-bold">Upperclass AI</div>
              <div className="text-xs text-gray-500">We see the future</div>
            </div>
            <div className="w-20 h-14 md:w-24 md:h-16 bg-white flex items-center justify-center shadow rounded">
              ▶
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4">

            {/* USER CARD */}
            <div className="bg-white rounded-xl p-4 border border-blue-100 flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-gray-200 flex items-center justify-center mb-3">
                PJ
              </div>
              <div className="text-sm font-semibold">Peter Josh</div>
              <div className="text-xs text-gray-400">Student</div>
              <button className="mt-3 text-blue-500 text-xs">Edit</button>
            </div>

            {/* UPCOMING TASKS */}
            <div className="bg-white rounded-xl p-4 border border-blue-100 flex flex-col">
              <div className="font-semibold mb-2">Upcoming Tasks</div>
              <div className="space-y-2">
                {[
                  {name: "AI Introduction", date: "Nov 16th, 8:00 AM"},
                  {name: "Upperclass AI", date: "Nov 20th, 8:00 AM"},
                  {name: "Prompt Crafting", date: "Dec 5th, 12:00 PM"},
                ].map(task => (
                  <div key={task.name} className="flex items-start justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">●</div>
                      <div>
                        <div className="text-sm font-medium">{task.name}</div>
                        <div className="text-xs text-gray-400">{task.date}</div>
                      </div>
                    </div>
                    <div className="text-gray-400">...</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI TUTOR */}
            <ChatBot />
            

            {/* MENTOR */}
            <div className="bg-white rounded-xl p-4 border border-blue-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">M</div>
              <div className="text-sm">Connect with Mentor</div>
            </div>
          </div>
        </div>

        {/* --- ROW 2 --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* CIRCLE PROGRESS */}
      
 <div className="bg-white p-6 rounded-xl border border-blue-100 flex flex-col items-center">
      <div className="w-32">
        <CircularProgressbar 
          value={82} 
          text="82%" 
          strokeWidth={10}
          styles={buildStyles({
            textColor: "#1e40af",
            pathColor: "#1e40af",
            trailColor: "#e5e7eb"
          })}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">Overall Progress</p>
    </div>
          {/* COURSES */}
          <div className="bg-white rounded-xl p-4 border border-blue-100">
            <div className="font-semibold mb-3">Courses</div>
            <ul className="space-y-3 text-sm text-gray-700">
              {["AI Introduction", "Prompt Crafting", "Machine Learning", "Deep Learning"].map(course => (
                <li key={course} className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center text-blue-600"><FaBox /></div>
                  {course}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* --- ROW 3 --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* BAR CHART */}
          <div className="bg-white rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold">Time Spent</div>
              <select className="text-sm bg-blue-50 px-2 py-1 rounded">
                <option>Week</option>
                <option>Month</option>
              </select>
            </div>
            

            <div className="flex items-end gap-3 h-28">
              {[10, 20, 12, 24, 14, 28].map((h, i) => (
                <div key={i} className="w-6 bg-blue-600 rounded" style={{ height: `${h * 3}px` }}></div>
              ))}
            </div>
          </div>

          {/* BUTTON GRID */}
          <div className="bg-white rounded-xl p-4 border border-blue-100 grid grid-cols-2 gap-2 text-sm">
            <button className="flex items-center gap-2 text-blue-600"><HiOutlineBadgeCheck /> Start a Project</button>
            <button className="flex items-center gap-2 text-gray-600"><AiOutlineSchedule /> Ongoing Courses</button>
            <button className="flex items-center gap-2 text-gray-600"><FiUser /> View Performance</button>
            <button className="flex items-center gap-2 text-gray-600"><FaRegSmile /> New Courses</button>
          </div>

      

        </div>

        {/* --- ROW 4 --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-4 border border-blue-100">
                <div className="font-semibold mb-2">Latest Schedule</div>
                <div className="text-sm text-gray-600">Nov 16: AI Introduction</div>
                <div className="text-sm text-gray-600">Nov 20: Upperclass AI</div>
             </div>

         
        </div>

      </main>
    </div>
  );
}
