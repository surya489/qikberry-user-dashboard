import clsx from "clsx";
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
  className?: string;
}

const Input = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerClassName = "",
  className = "",
  id,
  ...props
}: InputProps) => {
  const inputId = id ?? props.name;

  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      {label ? (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      ) : null}

      <div className="flex items-center rounded-xl border border-slate-300 bg-white px-3 transition-all duration-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200 dark:border-slate-600 dark:bg-slate-800 dark:focus-within:border-indigo-400 dark:focus-within:ring-indigo-900">
        {leftIcon ? <span className="text-slate-500 dark:text-slate-400">{leftIcon}</span> : null}

        <input
          id={inputId}
          autoComplete="off"
          className={clsx(
            "w-full bg-transparent py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:text-slate-100 dark:placeholder:text-slate-500",
            className
          )}
          {...props}
        />

        {rightIcon ? <span className="text-slate-500 dark:text-slate-400">{rightIcon}</span> : null}
      </div>

      {error ? (
        <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
};

export default Input;
