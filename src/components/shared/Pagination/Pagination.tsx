interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const getVisiblePages = (): Array<number | "ellipsis"> => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, "ellipsis", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "ellipsis", currentPage, "ellipsis", totalPages];
  };

  const visiblePages = getVisiblePages();
  const buttonBase =
    "inline-flex h-9 min-w-9 shrink-0 cursor-pointer items-center justify-center rounded-full px-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50";
  const inactiveButton =
    "border border-slate-200 bg-white text-slate-600 hover:border-indigo-500 hover:text-indigo-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-indigo-400 dark:hover:text-indigo-400";

  return (
    <div className="mt-6">
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-1 sm:gap-2">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className={`${buttonBase} ${inactiveButton}`}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {visiblePages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="inline-flex h-9 min-w-6 shrink-0 items-center justify-center px-1 text-sm text-slate-400"
              >
                …
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={
                isActive
                  ? `${buttonBase} bg-indigo-600 text-white shadow-sm dark:bg-indigo-500`
                  : `${buttonBase} ${inactiveButton}`
              }
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className={`${buttonBase} ${inactiveButton}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400 sm:hidden">
        Page {currentPage} of {totalPages}
      </p>
    </div>
  );
};

export default Pagination;
