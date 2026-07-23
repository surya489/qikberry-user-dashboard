import clsx from "clsx";
import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
  visible: boolean;
  threshold?: number;
}

const ScrollToTop = ({ visible }: ScrollToTopProps) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={handleClick}
      className={clsx(
        "fixed bottom-6 right-6 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 transition-all duration-300 hover:bg-indigo-700 hover:shadow-xl dark:bg-indigo-500 dark:hover:bg-indigo-400",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default ScrollToTop;
