function SkeletonBlock({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-md bg-[linear-gradient(90deg,var(--color-app-subtle)_0%,#E2E8F0_50%,var(--color-app-subtle)_100%)] bg-[length:200%_100%] ${className}`} />
}

export function DashboardSkeleton() {
  return (
    <div>
      <div className="mb-[22px] flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <SkeletonBlock className="h-8 w-40" />
          <SkeletonBlock className="mt-3 h-4 w-64 max-w-full" />
        </div>
        <div className="flex gap-2.5">
          <SkeletonBlock className="h-10 w-32" />
          <SkeletonBlock className="h-10 w-36" />
        </div>
      </div>
      <div className="mb-7 grid grid-cols-2 gap-3.5 min-[700px]:grid-cols-3 min-[1100px]:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonBlock className="h-[106px] rounded-[14px]" key={index} />
        ))}
      </div>
      <div className="grid gap-5 min-[1100px]:grid-cols-[1.6fr_1fr]">
        <SkeletonBlock className="h-[360px] rounded-[14px]" />
        <div className="flex flex-col gap-5">
          <SkeletonBlock className="h-[220px] rounded-[14px]" />
          <SkeletonBlock className="h-[210px] rounded-[14px]" />
        </div>
      </div>
    </div>
  )
}
