export default function Avatar() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Avatar Settings</h1>

      <div className="flex items-center gap-6">
        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl">
          PJ
        </div>

        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Change Avatar
        </button>
      </div>
    </div>
  );
}
