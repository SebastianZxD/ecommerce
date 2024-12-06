import { Skeleton } from "@/components/ui/skeleton";

export const SheetSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-6 w-[200px]" /> {/* Title */}
        <Skeleton className="h-4 w-[300px]" /> {/* Description */}
      </div>
      <Skeleton className="h-[300px] w-full rounded-lg" /> {/* Image */}
      <div className="space-y-2">
        <Skeleton className="h-5 w-[150px]" /> {/* Product name */}
        <Skeleton className="h-4 w-[100px]" /> {/* Price */}
        <Skeleton className="h-20 w-full" /> {/* Description */}
      </div>
    </div>
  );
};