import { useEffect, useState } from "react";

interface UseDebouncedValueResult {
  debouncedValue: string;
  isPending: boolean;
}

export const useDebouncedValue = (
  value: string,
  delay: number
): UseDebouncedValueResult => {
  const [debouncedValue, setDebouncedValue] = useState(value.trim());
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setDebouncedValue("");
      setIsPending(false);
      return;
    }

    setIsPending(true);
    const timeout = window.setTimeout(() => {
      setDebouncedValue(trimmedValue);
      setIsPending(false);
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [value, delay]);

  return { debouncedValue, isPending };
};
