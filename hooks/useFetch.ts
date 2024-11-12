/** @format */

import { useState } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
}

const useFetch = <T>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`Error: ${response.status} - ${response.statusText}`);
        throw new Error(response.statusText);
      }
      const result: T = await response.json();
      setData(result);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useFetch;
