import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export const ProductThumbnailSkeleton = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <Card className="border-none relative">
        <CardHeader className="absolute z-10 right-2 top-2 p-0">
          <Skeleton className="h-6 w-16 rounded-full" /> {/* NEW badge */}
        </CardHeader>
        
        <CardContent className="flex justify-center p-0">
          <div className="relative w-[400px] h-[400px]">
            <Skeleton className="w-full h-full rounded-md" /> {/* Image */}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between p-0">
          <div className="flex items-center gap-2 justify-around">
            <div className="flex flex-col">
              {/* Discount badge */}
              <Skeleton className="w-[400px] h-[40px] rounded-md" />
              
              {/* Price container */}
              <Skeleton className="w-[400px] h-[40px] rounded-md mt-2" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};