import { Skeleton } from '@/components/ui/skeleton'

export function CarCardSkeleton() {
  return (
    <div className="car-card relative h-full rounded-2xl bg-white overflow-hidden">
      {/* Image Skeleton */}
      <Skeleton className="aspect-[4/3] w-full rounded-t-2xl rounded-b-none" />

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <Skeleton className="h-6 w-3/4" />

        {/* Price */}
        <Skeleton className="h-9 w-1/2" />

        {/* Stats */}
        <div className="flex gap-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-2" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-2" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Badge */}
        <div className="pt-3 border-t border-gray-100">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </div>
  )
}
