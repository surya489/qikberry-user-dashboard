import Select, { type SelectOption } from "../../ui/Select/Select";

interface FilterSelectProps {
  id: string;
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const FilterSelect = ({
  id,
  label,
  value,
  options,
  onChange,
  placeholder,
}: FilterSelectProps) => {
  return (
    <Select
      id={id}
      label={label}
      value={value}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default FilterSelect;
