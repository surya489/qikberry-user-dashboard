import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const Select = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
}: SelectProps) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <label
        htmlFor={selectId}
        className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
      >
        {label}
      </label>

      <button
        id={selectId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className={clsx(
          "flex w-full cursor-pointer items-center justify-between gap-2 rounded-xl border bg-transparent px-3 py-3 text-left text-sm transition",
          isOpen
            ? "border-indigo-500 ring-2 ring-indigo-200 dark:border-indigo-400 dark:ring-indigo-900"
            : "border-slate-200 hover:border-slate-300 dark:border-slate-600 dark:hover:border-slate-500"
        )}
      >
        <span
          className={clsx(
            "truncate",
            selectedOption
              ? "font-medium text-slate-800 dark:text-slate-100"
              : "text-slate-500 dark:text-slate-400"
          )}
        >
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown
          size={16}
          className={clsx(
            "shrink-0 text-slate-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen ? (
        <ul
          role="listbox"
          aria-labelledby={selectId}
          className="absolute z-30 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-600 dark:bg-slate-800"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={clsx(
                    "flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2.5 text-left text-sm transition",
                    isSelected
                      ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-700/60"
                  )}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected ? <Check size={14} className="shrink-0" /> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Select;
