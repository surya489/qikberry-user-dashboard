import { type ButtonSize, type ButtonVariant } from "./Button.types";

export const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 hover:bg-indigo-700 text-white",

  secondary:
    "bg-slate-200 hover:bg-slate-300 text-slate-900",

  outline:
    "border border-slate-300 bg-white hover:bg-slate-100 text-slate-900",

  danger:
    "bg-red-600 hover:bg-red-700 text-white",

  ghost:
    "bg-transparent hover:bg-slate-100 text-slate-900",
};

export const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm",

  md: "px-4 py-2.5 text-base",

  lg: "px-5 py-3 text-lg",
};

export const baseButtonStyles =
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed";