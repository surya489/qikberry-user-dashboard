import { ArrowRight } from "lucide-react";
import type { MouseEvent } from "react";
import clsx from "clsx";

import Button from "../../../ui/Button/Button";

interface SliderPostCardProps {
  id: number;
  title: string;
  body: string;
  userId: number;
  onClick?: () => void;
}

const userBadgePalette = [
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-950/80 dark:text-violet-300",
];

const getUserBadgeClass = (userId: number) =>
  userBadgePalette[(userId - 1) % userBadgePalette.length];

const SliderPostCard = ({ id, title, body, userId, onClick }: SliderPostCardProps) => {
  const handleViewClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick?.();
  };

  return (
    <article
      className="group flex h-full min-h-[22rem] w-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-slate-700/90 dark:bg-slate-800/90"
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-indigo-50/80 to-transparent px-5 py-4 dark:border-slate-700 dark:from-indigo-950/40">
        <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm dark:bg-slate-700 dark:text-slate-200">
          Post #{id}
        </span>
        <span
          className={clsx(
            "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
            getUserBadgeClass(userId)
          )}
        >
          User {userId}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 py-5">
        <h3 className="line-clamp-2 text-xl font-bold leading-snug text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        <p className="mt-3 flex-1 line-clamp-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {body}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-5 py-4 dark:border-slate-700 dark:bg-slate-900/50">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Author · User #{userId}
        </span>
        <Button size="sm" variant="ghost" type="button" onClick={handleViewClick}>
          Read more
          <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
        </Button>
      </div>
    </article>
  );
};

export default SliderPostCard;
