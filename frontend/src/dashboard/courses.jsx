import { FiLock } from "react-icons/fi";
import { FaCube } from "react-icons/fa";
import Sidebar from "./Sidebar";

export default function Courses() {
  const courseList = [
    {
      name: "Prompt Crafting",
      desc: "Teaches AI fundamentals",
      sections: 46,
      progress: 45,
      active: false,
    },
    {
      name: "Machine Learning",
      desc: "Teaches you how to make computers learn from data",
      sections: 60,
      progress: 10,
      active: false,
    },
    {
      name: "Deep Learning",
      desc: "Teaches computers to learn from complex data",
      sections: 34,
      progress: 5,
      active: false,
    },
    {
      name: "Elements of AI",
      desc: "Teaches the basics of artificial intelligence and how it works",
      sections: 50,
      progress: 20,
      active: false,
    },
  ];

  const ongoing = [
    { name: "AI Introduction", progress: 60, active: true },
    { name: "Prompt Crafting", progress: 40 },
    { name: "Machine Learning", progress: 15 },
    { name: "Deep Learning", progress: 10 },
    { name: "Elements of AI", progress: 25 },
  ];

  return (
    <div className="w-full flex gap-6 p-4" >
     
      {/* LEFT SIDE MAIN COURSES */}
      <div className="flex-1 bg-blue-100">
        <h1 className="text-2xl font-bold mb-4">Your Courses</h1>

        {/* SEARCH */}
        <input
          className="w-80 mb-6 pl-3 py-2 rounded-lg bg-gray-100 outline-none"
          placeholder="Search courses..."
        />

        {/* COURSE LIST */}
        <div className="space-y-5">
          {courseList.map((c, i) => (
            <div
              key={i}
              className="w-full bg-white rounded-xl p-5 shadow-sm flex gap-6 items-center"
            >
              {/* THUMBNAIL */}
              <div className="w-28 h-28 bg-blue-100 rounded-lg" />

              {/* TEXT */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <p className="text-gray-500 text-sm mt-1">{c.desc}</p>
                <p className="text-gray-600 text-sm mt-3">
                  {c.sections} Sections
                </p>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col gap-3 items-center">
                <FiLock className="text-blue-600 text-lg" />

                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-80 bg-white rounded-xl shadow-sm border p-5">
        <h2 className="text-lg font-semibold mb-4">Ongoing Courses</h2>

        <div className="space-y-4">
          {ongoing.map((c, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg border flex gap-3 items-start ${
                c.active ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              {/* Icon */}
              <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                <FaCube />
              </div>

              {/* TEXT + PROGRESS */}
              <div className="flex-1">
                <p className="text-sm font-medium">{c.name}</p>

                <div className="mt-1 w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
