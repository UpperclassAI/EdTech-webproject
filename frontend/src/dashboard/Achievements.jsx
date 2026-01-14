import { useTheme } from "../context/ThemeContext";

export default function Achievements() {
  const { theme } = useTheme();

  const badges = [
    "🏆 Beginner Badge",
    "🏅 50% Course Progress",
    "🎯 Consistency Award",
    "🔥 Top Performer",
    "📘 Completed AI Intro",
    "⚡ Speed Learner",
    "💡 Creative Thinker",
    "🎓 Passed Assessment",
    "⭐ 5-Star Streak",
    "🚀 Project Completed",
    "👑 Elite Member",
    "🏹 Accuracy Master",
    "🎵 Smooth Progress",
    "📅 7-Day Streak",
    "🧠 Deep Thinker",
    "🌟 Mentor's Pick",
    "📊 Analytics Pro",
    "🎒 Assignment Master",
    "🧩 Problem Solver",
    "🏆 Achievement Unlocked",
    "⏱️ Time Manager",
    "📈 Growth Champion",
    "🔒 Skill Level Up",
    "🏁 Milestone Reached",
  ];

  const pageBg = theme === "dark" ? "bg-slate-900" : "bg-blue-50";
  const cardBg = theme === "dark" ? "bg-slate-800 border-slate-700 text-gray-200" : "bg-white border-gray-100 text-gray-800";
  const headerText = theme === "dark" ? "text-gray-200" : "text-gray-900";
  const subText = theme === "dark" ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`${pageBg} w-full p-6 transition-colors duration-300`}>
      <div className="flex items-center justify-between mb-6 ">
        <h2 className={`text-2xl font-bold ${headerText}`}>Achievements</h2>
        <div className={`text-sm ${subText}`}>{badges.length} Badges</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 ">
        {badges.map((b, i) => (
          <div
            key={i}
            className={`${cardBg} rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center h-50 hover:shadow-md transition`}
          >
            <div className="text-2xl mb-2 ">{b.split(" ")[0]}</div>
            <div className="text-sm font-medium">{b.split(" ").slice(1).join(" ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
