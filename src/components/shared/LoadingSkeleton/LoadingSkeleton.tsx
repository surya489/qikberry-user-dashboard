import clsx from "clsx";

interface LoadingSkeletonProps {
  count?: number;
  variant?: "card" | "text" | "slider" | "photo" | "post";
  className?: string;
}

const PhotoSkeletonCard = () => (
  <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/60">
    <div className="h-52 w-full bg-slate-200 dark:bg-slate-700" />
    <div className="space-y-3 p-5">
      <div className="h-5 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-5 w-4/5 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-4 w-3/5 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="flex items-center justify-between pt-2">
        <div className="h-4 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
        <div className="h-8 w-16 rounded-lg bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  </div>
);

const PostSkeletonCard = () => (
  <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800/60">
    <div className="flex items-start justify-between gap-3">
      <div className="h-5 w-20 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-5 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
    </div>
    <div className="mt-5 h-6 w-4/5 rounded-full bg-slate-200 dark:bg-slate-700" />
    <div className="mt-3 space-y-2">
      <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-4 w-3/4 rounded-full bg-slate-200 dark:bg-slate-700" />
    </div>
    <div className="mt-5 flex items-center justify-between">
      <div className="h-4 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="h-8 w-16 rounded-lg bg-slate-200 dark:bg-slate-700" />
    </div>
  </div>
);

const LoadingSkeleton = ({
  count = 3,
  variant = "card",
  className = "",
}: LoadingSkeletonProps) => {
  if (variant === "slider") {
    return (
      <div
        className={clsx(
          "min-h-[22rem] animate-pulse rounded-[1.6rem] border border-slate-200 bg-slate-100 p-4 dark:border-slate-700 dark:bg-slate-800/60",
          className
        )}
      >
        <div className="h-full min-h-[18rem] rounded-2xl bg-slate-200/80 dark:bg-slate-700/80" />
        <div className="mt-5 flex justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
          <div className="h-9 w-20 rounded-xl bg-slate-200 dark:bg-slate-700" />
          <div className="h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
      </div>
    );
  }

  if (variant === "photo") {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
          className
        )}
      >
        {Array.from({ length: count }, (_, index) => (
          <PhotoSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (variant === "post") {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 gap-4 lg:grid-cols-2",
          className
        )}
      >
        {Array.from({ length: count }, (_, index) => (
          <PostSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={clsx("space-y-4", className)}>
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={clsx(
            variant === "text"
              ? "h-4 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700"
              : "animate-pulse rounded-2xl border border-slate-200 bg-slate-100 p-5 dark:border-slate-700 dark:bg-slate-800/60"
          )}
        >
          {variant === "card" ? (
            <div className="space-y-3">
              <div className="h-4 w-24 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="h-5 w-3/4 rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-5/6 rounded-full bg-slate-200 dark:bg-slate-700" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
