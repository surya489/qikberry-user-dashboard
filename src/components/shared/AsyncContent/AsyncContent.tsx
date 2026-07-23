import type { ReactNode } from "react";
import clsx from "clsx";

import LoadingSkeleton from "../LoadingSkeleton/LoadingSkeleton";

interface AsyncContentProps {
  loading: boolean;
  error: string;
  isSearching?: boolean;
  skeletonCount?: number;
  skeletonVariant?: "card" | "text" | "slider" | "photo" | "post";
  className?: string;
  children: ReactNode;
}

const AsyncContent = ({
  loading,
  error,
  isSearching = false,
  skeletonCount = 3,
  skeletonVariant = "card",
  className,
  children,
}: AsyncContentProps) => {
  if (loading || isSearching) {
    return (
      <div className={className}>
        <LoadingSkeleton count={skeletonCount} variant={skeletonVariant} />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={clsx(
          "rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400",
          className
        )}
      >
        {error}
      </div>
    );
  }

  return <div className={className}>{children}</div>;
};

export default AsyncContent;
