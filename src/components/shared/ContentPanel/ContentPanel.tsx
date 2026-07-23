import type { ReactNode } from "react";
import clsx from "clsx";

interface ContentPanelProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: "default" | "accent";
  fillHeight?: boolean;
  children: ReactNode;
}

const variantStyles = {
  default:
    "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/80",
  accent:
    "border-indigo-100 bg-gradient-to-br from-white via-indigo-50/30 to-slate-50 dark:border-indigo-900/40 dark:from-slate-900 dark:via-indigo-950/30 dark:to-slate-900",
};

const ContentPanel = ({
  title,
  subtitle,
  icon,
  action,
  variant = "default",
  fillHeight = false,
  children,
}: ContentPanelProps) => {
  return (
    <section
      className={clsx(
        "rounded-[1.75rem] border p-6 shadow-sm transition-shadow hover:shadow-md",
        variantStyles[variant],
        fillHeight && "flex h-full flex-col"
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {icon ? (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              {icon}
            </div>
          ) : null}
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
            {subtitle ? (
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
            ) : null}
          </div>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className={clsx("mt-6", fillHeight && "flex flex-1 flex-col")}>{children}</div>
    </section>
  );
};

export default ContentPanel;
