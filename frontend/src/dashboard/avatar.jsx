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
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile sidebar toggle could be added here if needed */}
        
        {/* Main content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 w-full">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className={`text-xl sm:text-2xl md:text-3xl font-bold ${textColor}`}>
              Avatar Dashboard
            </h1>
            <p className={`text-sm sm:text-base mt-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Manage your avatar and profile settings
            </p>
          </div>

          {/* Responsive Grid - 1 column on mobile, 2 on tablet, 2/3/4 based on screen size */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4 sm:gap-6">
            {cards.map((card) => (
              <div
                key={card.title}
                className={`${cardBg} rounded-xl shadow-sm p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 hover:shadow-md transition-all duration-300 hover:-translate-y-1 border ${
                  theme === "dark" ? "border-slate-700" : "border-gray-200"
                }`}
              >
                {/* Avatar Circle */}
                <div
                  className={`w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${
                    theme === "dark" ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  {card.content}
                </div>
                
                {/* Card Title */}
                <div className="text-center">
                  <p className={`text-base sm:text-lg font-semibold ${textColor}`}>
                    {card.title}
                  </p>
                  {/* Optional subtitle or info could go here */}
                </div>
                
                {/* Optional Action Button */}
                <button className={`mt-1 sm:mt-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 ${
                  theme === "dark" 
                    ? "bg-slate-700 text-blue-300 hover:bg-slate-600" 
                    : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}>
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Additional responsive content section */}
          <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Stats Section */}
            <div className={`lg:col-span-2 ${cardBg} rounded-xl shadow-sm p-4 sm:p-6`}>
              <h2 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${textColor}`}>
                Avatar Usage Stats
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div className={`p-3 rounded-lg ${
                  theme === "dark" ? "bg-slate-700" : "bg-blue-50"
                }`}>
                  <p className={`text-xs sm:text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Views
                  </p>
                  <p className={`text-lg sm:text-xl font-bold mt-1 ${textColor}`}>
                    1.2K
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  theme === "dark" ? "bg-slate-700" : "bg-blue-50"
                }`}>
                  <p className={`text-xs sm:text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Last Used
                  </p>
                  <p className={`text-lg sm:text-xl font-bold mt-1 ${textColor}`}>
                    2 days
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  theme === "dark" ? "bg-slate-700" : "bg-blue-50"
                }`}>
                  <p className={`text-xs sm:text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Customizations
                  </p>
                  <p className={`text-lg sm:text-xl font-bold mt-1 ${textColor}`}>
                    5
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={`${cardBg} rounded-xl shadow-sm p-4 sm:p-6`}>
              <h2 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 ${textColor}`}>
                Quick Actions
              </h2>
              <div className="space-y-2 sm:space-y-3">
                <button className={`w-full px-4 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 ${
                  theme === "dark" 
                    ? "bg-slate-700 hover:bg-slate-600 text-blue-300" 
                    : "bg-blue-50 hover:bg-blue-100 text-blue-600"
                }`}>
                  Change Avatar
                </button>
                <button className={`w-full px-4 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 ${
                  theme === "dark" 
                    ? "bg-blue-700 hover:bg-blue-600 text-white" 
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}>
                  Customize Theme
                </button>
                <button className={`w-full px-4 py-2.5 rounded-lg text-sm sm:text-base font-medium transition-colors duration-200 ${
                  theme === "dark" 
                    ? "bg-slate-700 hover:bg-slate-600 text-blue-300" 
                    : "bg-blue-50 hover:bg-blue-100 text-blue-600"
                }`}>
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

































