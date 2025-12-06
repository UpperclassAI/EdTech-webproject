// Achievements.jsx
export default function Achievements() {
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

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Achievements</h2>
        <div className="text-sm text-gray-600">24 Badges</div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {badges.map((b, i) => (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 flex flex-col items-center justify-center text-center min-h-[110px] hover:shadow-md transition"
          >
            <div className="text-2xl mb-2">{b.split(" ")[0]}</div>
            <div className="text-sm font-medium text-gray-700">{b.split(" ").slice(1).join(" ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
