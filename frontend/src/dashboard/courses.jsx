export default function Courses() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Courses</h1>

      <input
        className="w-80 mb-6 pl-3 py-2 rounded-lg bg-gray-100"
        placeholder="Search courses..."
      />

      <div className="space-y-4">
        <div className="p-4 bg-white rounded-lg border">AI Introduction</div>
        <div className="p-4 bg-white rounded-lg border">Prompt Crafting</div>
        <div className="p-4 bg-white rounded-lg border">Machine Learning</div>
        <div className="p-4 bg-white rounded-lg border">Deep Learning</div>
      </div>
    </div>
  );
}
