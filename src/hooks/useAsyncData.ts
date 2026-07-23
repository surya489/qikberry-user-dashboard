import { useEffect, useState } from "react";

interface UseAsyncDataResult<T> {
  data: T;
  loading: boolean;
  error: string;
}

export const useAsyncData = <T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
  initialData: T
): UseAsyncDataResult<T> => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const result = await fetcher();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to load data right now.");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [cacheKey]);

  return { data, loading, error };
};
