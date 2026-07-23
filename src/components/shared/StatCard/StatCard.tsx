import clsx from "clsx";

interface StatCardProps {
  label: string;
  value: number | string;
  className?: string;
}

const StatCard = ({ label, value, className }: StatCardProps) => {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur transition hover:bg-white/15",
        className
      )}
    >
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-100">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
};

export default StatCard;
