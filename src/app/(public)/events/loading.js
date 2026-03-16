import { CardSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-8" />
      <div className="grid md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }, (_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
