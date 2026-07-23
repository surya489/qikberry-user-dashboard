interface EmptyStateProps {
  title: string;
  description: string;
}

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center dark:border-slate-600 dark:bg-slate-800/50">
      <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
    </div>
  );
};

export default EmptyState;
