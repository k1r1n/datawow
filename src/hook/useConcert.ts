import { useState, useEffect } from "react";
import callApi from "@/lib/api";
import { Concert } from "@/types/concert-list";

export function useConcert() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchConcertsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await callApi("/concerts");
        setConcerts(data as Concert[]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(
            new Error(
              String(
                err?.message ||
                  "An unknown error occurred while fetching concerts."
              )
            )
          );
        }
        setConcerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchConcertsData();
  }, []);

  return { concerts, loading, error };
}
