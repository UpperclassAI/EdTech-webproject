import Sidebar from "./Sidebar";
import { useTheme } from "../context/ThemeContext";

export default function AvatarGrid() {
  const { theme } = useTheme();

  const cards = [
    { title: "Current Avatar", content: "PJ", color: "from-blue-300 to-purple-300" },
    { title: "Choose Avatar", content: "8 Styles", color: "from-green-300 to-teal-300" },
    { title: "Profile Info", content: "Peter Josh", color: "from-yellow-300 to-orange-300" },
    { title: "Preferences", content: "Settings", color: "from-pink-300 to-red-300" },
  ];

  const pageBg = theme === "dark" ? "bg-slate-900" : "bg-blue-50";
  const textColor = theme === "dark" ? "text-gray-200" : "text-gray-800";
  const cardBg = theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200";

  return (
    <div className={`min-h-screen ${pageBg} transition-colors duration-300`}>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 p-6 md:p-8">
          <h1 className={`text-2xl md:text-3xl font-bold mb-6 ${textColor}`}>Avatar Dashboard</h1>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => (
              <div
                key={card.title}
                className={`${cardBg} rounded-xl shadow-sm p-6 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow`}
              >
                <div
                  className={`w-32 h-32 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center text-4xl font-bold text-blue-600 dark:text-blue-300`}
                >
                  {card.content}
                </div>
                <p className={`text-lg font-semibold ${textColor}`}>{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
