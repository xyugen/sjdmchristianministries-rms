import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PolicyCardSkeleton = () => (
  <Card className="shadow-none">
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="ml-4 flex items-center space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </CardHeader>
  </Card>
);

export const PolicyGridSkeleton = () => (
  <Card className="shadow-none">
    <CardHeader>
      <div className="mb-2 flex items-start justify-between">
        <div className="flex-1">
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div className="flex space-x-1">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </CardHeader>
  </Card>
);

export const PolicyListSkeletons = ({ count = 5 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, index) => (
      <PolicyCardSkeleton key={index} />
    ))}
  </div>
);

export const PolicyGridSkeletons = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, index) => (
      <PolicyGridSkeleton key={index} />
    ))}
  </div>
);
