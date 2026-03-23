export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-[60vh] bg-gray-200" />
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-8">
        <div className="flex flex-col items-center gap-3">
          <div className="h-3 w-24 bg-gray-200 rounded" />
          <div className="h-6 w-64 bg-gray-200 rounded" />
          <div className="h-3 w-96 bg-gray-200 rounded" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 rounded-xl p-6 space-y-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto" />
              <div className="h-4 w-24 bg-gray-200 rounded mx-auto" />
              <div className="h-3 w-full bg-gray-200 rounded" />
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="h-64 bg-gray-200 rounded-2xl" />
          <div className="space-y-4 py-8">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-6 w-48 bg-gray-200 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-3/4 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
