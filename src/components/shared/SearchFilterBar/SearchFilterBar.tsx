import type { ChangeEvent, ReactNode } from "react";
import { Search } from "lucide-react";

import Input from "@/components/ui/Input/Input";

interface SearchFilterBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  filterSlot?: ReactNode;
}

const SearchFilterBar = ({
  value,
  onChange,
  placeholder,
  filterSlot,
}: SearchFilterBarProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800/60">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="min-w-0 flex-1">
          <Input
            value={value}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
            placeholder={placeholder}
            leftIcon={<Search size={16} className="text-slate-400" />}
          />
        </div>
        {filterSlot ? (
          <div className="w-full shrink-0 md:w-52">{filterSlot}</div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchFilterBar;
