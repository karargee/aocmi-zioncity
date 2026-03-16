import Skeleton, { TableSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <TableSkeleton />
        <TableSkeleton />
      </div>
    </div>
  );
}
