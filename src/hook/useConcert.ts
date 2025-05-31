import { useState, useEffect, useCallback } from "react";
import callApi from "@/lib/api";
import { Concert } from "@/types/concert-list";

export function useConcert() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConcertsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await callApi("/concerts");

      setConcerts(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        let message = "An unknown error occurred while fetching concerts.";
        if (
          typeof err === "object" &&
          err !== null &&
          "message" in err &&
          typeof (err as { message: unknown }).message === "string"
        ) {
          message = (err as { message: string }).message;
        }
        setError(new Error(message));
      }
      setConcerts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConcertsData();
  }, [fetchConcertsData]);

  const createConcert = async (newConcert: Omit<Concert, "id">) => {
    setLoading(true);
    setError(null);
    try {
      const response = await callApi("/concerts", {
        method: "POST",
        data: JSON.stringify(newConcert),
      });
      setConcerts((prev) => [...prev, response as Concert]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(
          new Error(
            String(
              err?.message ||
                "An unknown error occurred while creating the concert."
            )
          )
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return { concerts, loading, error, createConcert, fetchConcertsData };
}
