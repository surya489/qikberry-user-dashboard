import { ArrowRight } from "lucide-react";
import type { MouseEvent } from "react";

import Button from "../../../ui/Button/Button";

interface PostCardProps {
  id: number;
  title: string;
  body: string;
  userId: number;
  onClick?: () => void;
}

const userBadgePalette = [
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
];

const getUserBadgeClass = (userId: number) =>
  userBadgePalette[(userId - 1) % userBadgePalette.length];

const PostCard = ({ id, title, body, userId, onClick }: PostCardProps) => {
  const handleViewClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick?.();
  };

  return (
    <article
      className="group relative flex h-full min-h-[15.5rem] cursor-pointer flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/80 dark:hover:border-indigo-800 dark:hover:shadow-indigo-900/20"
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
      <div className="flex items-start justify-between gap-2">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
          Post #{id}
        </span>
        <span
          className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${getUserBadgeClass(userId)}`}
        >
          User {userId}
        </span>
      </div>

      <h3 className="mt-4 line-clamp-2 text-lg font-semibold leading-snug text-slate-900 transition-colors group-hover:text-indigo-700 dark:text-slate-100 dark:group-hover:text-indigo-300">
        {title}
      </h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {body}
      </p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-700/80">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          User #{userId}
        </span>
        <Button size="sm" variant="ghost" type="button" onClick={handleViewClick}>
          View
          <ArrowRight size={16} />
        </Button>
      </div>
    </article>
  );
};

export default PostCard;
