import { useState, useCallback, useEffect } from "react";
import callApi from "@/lib/api";
import { Reserve } from "@/types/reserve";

export function useReserve() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const reserveConcert = useCallback(
    async ({ concertId, userId }: Reserve) => {
      setLoading(true);
      setError(null);
      try {
        const response = await callApi(`/reservations`, {
          method: "POST",
          data: JSON.stringify({ concertId, userId }),
        });

        return response.data;
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(
            new Error(
              String(
                (err as any)?.message ||
                  "An unknown error occurred while reserving the concert."
              )
            )
          );
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError]
  );

  const getReservations = useCallback(async (userId: string) => {
    const response = await callApi(`/reservations/${userId}`);

    if (response.success) {
      return response.data;
    }

    throw new Error(response.message);
  }, []);

  return { reserveConcert, getReservations, loading, error };
}
