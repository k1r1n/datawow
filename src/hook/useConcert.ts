import { useState, useEffect, useCallback } from "react";
import { useSetAtom } from "jotai";
import callApi from "@/lib/api";
import { Concert, ConcertList } from "@/types/concert-list";
import { concertsAtom } from "@/store/concert"; // Changed 'concerts' to 'atoms'

export function useConcert() {
  const [concerts, setConcerts] = useState<ConcertList>({
    list: [],
    totalSeats: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const setConcertsAtom = useSetAtom(concertsAtom);

  const fetchConcertsData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await callApi("/concerts");
      setConcerts(response.data);
      setConcertsAtom(response.data);
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
      setConcerts([]);
      setConcertsAtom([]);
    } finally {
      setLoading(false);
    }
  }, [setConcertsAtom]);

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
      setConcerts((prev) => [...prev, response.data]);
      setConcertsAtom((prev) => [...prev, response.data]);
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

  const deleteConcert = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await callApi(`/concerts/${id}`, {
        method: "DELETE",
      });
      setConcerts((prev) => ({
        ...prev,
        list: prev.list.filter((concert) => concert.id !== id),
      }));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(
          new Error(
            String(
              err?.message ||
                "An unknown error occurred while deleting the concert."
            )
          )
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    concerts,
    loading,
    error,
    createConcert,
    fetchConcertsData,
    deleteConcert,
  };
}
