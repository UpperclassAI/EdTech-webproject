import Sidebar from "./Sidebar";

export default function AvatarGrid() {
  const cards = [
    { title: "Current Avatar", content: "PJ", color: "from-blue-100 to-purple-100" },
    { title: "Choose Avatar", content: "8 Styles", color: "from-green-100 to-teal-100" },
    { title: "Profile Info", content: "Peter Josh", color: "from-yellow-100 to-orange-100" },
    { title: "Preferences", content: "Settings", color: "from-pink-100 to-red-100" },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Avatar Dashboard</h1>

          {/* 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card) => (
              <div
                key={card.title}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center gap-4 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-32 h-32 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center text-4xl font-bold text-blue-600`}
                >
                  {card.content}
                </div>
                <p className="text-lg font-semibold text-gray-800">{card.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
