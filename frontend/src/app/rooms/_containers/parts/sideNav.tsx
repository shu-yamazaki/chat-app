

export default function SideNav() {
  return (
    <div className="w-16 bg-gray-900 text-white flex flex-col items-center py-4 space-y-4">
      <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-sm font-bold">
        L
      </div>
      <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center text-sm font-bold">
        <span className="text-white">New</span>
      </div>
      <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center text-sm font-bold">
        <span className="text-white">+</span>
      </div>
    </div>
  );
}
