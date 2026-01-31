import { useState, useCallback } from "react";

export default function useAsyncAction<T extends (...args: any[]) => Promise<any>>(fn: T) {
  const [loading, setLoading] = useState(false);

  const run = useCallback(async (...args: any[]) => {
    setLoading(true);
    try {
      return await fn(...args);
    } finally {
      setLoading(false);
    }
  }, [fn]);

  return { run, loading };
}
