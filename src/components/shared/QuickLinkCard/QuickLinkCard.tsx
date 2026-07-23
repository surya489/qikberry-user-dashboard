import clsx from "clsx";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface QuickLinkCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  accent: "indigo" | "violet" | "emerald";
  onClick: () => void;
}

const accentStyles = {
  indigo: {
    card: "from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-200/80 dark:border-indigo-800/60",
    icon: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
    arrow: "text-indigo-600 dark:text-indigo-400",
  },
  violet: {
    card: "from-violet-500/10 via-violet-500/5 to-transparent border-violet-200/80 dark:border-violet-800/60",
    icon: "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
    arrow: "text-violet-600 dark:text-violet-400",
  },
  emerald: {
    card: "from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-200/80 dark:border-emerald-800/60",
    icon: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
    arrow: "text-emerald-600 dark:text-emerald-400",
  },
};

const QuickLinkCard = ({
  title,
  description,
  icon,
  accent,
  onClick,
}: QuickLinkCardProps) => {
  const styles = accentStyles[accent];

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "group flex w-full cursor-pointer items-center gap-4 rounded-2xl border bg-gradient-to-br p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        styles.card
      )}
    >
      <div
        className={clsx(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition group-hover:scale-105",
          styles.icon
        )}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>

      <ArrowRight
        size={18}
        className={clsx("shrink-0 transition group-hover:translate-x-1", styles.arrow)}
      />
    </button>
  );
};

export default QuickLinkCard;
