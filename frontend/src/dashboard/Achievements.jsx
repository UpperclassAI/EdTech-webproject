export default function Achievements() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Achievements</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 bg-blue-50 border rounded-xl">🏆 Beginner Badge</div>
        <div className="p-6 bg-blue-50 border rounded-xl">🏅 50% Course Progress</div>
        <div className="p-6 bg-blue-50 border rounded-xl">🎯 Consistency Award</div>
        <div className="p-6 bg-blue-50 border rounded-xl">🔥 Top Performer</div>
      </div>
    </div>
  );
}
