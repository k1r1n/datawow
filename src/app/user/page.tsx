"use client";

import Layout from "@/components/layout";
import { useCallback, useEffect, useState } from "react";
import callApi from "@/lib/api";
import { useConcert } from "@/hook/useConcert";
import { ConcertCard } from "@/components/concert/concert-card";
import { useReserve } from "@/hook/useReserve";
import { MOCK_CURRENT_USER } from "@/constants/mockUser";

export default function UserPage() {
  const { concerts, fetchConcertsData } = useConcert();
  const { getReservations } = useReserve();
  const [userActiveReservations, setUserActiveReservations] = useState([]);
  const [loadingConcerts, setLoadingConcerts] = useState<boolean>(true);
  const [loadingReservations, setLoadingReservations] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null); // concertId for action

  const fetchData = useCallback(async () => {
    setLoadingConcerts(true);
    setLoadingReservations(true);
    setError(null);
    try {
      const reservationsData = await getReservations(MOCK_CURRENT_USER.id);

      setUserActiveReservations(reservationsData.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load data.");
      console.error(err);
    } finally {
      setLoadingConcerts(false);
      setLoadingReservations(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleReserve = async (concertId: string) => {
    setActionInProgress(concertId);
    setError(null);
    try {
      await callApi("/reservations", {
        method: "POST",
        data: { concertId, userId: MOCK_CURRENT_USER.id },
      });

      await fetchData();
      await fetchConcertsData();
    } catch (err: any) {
      setError(err.message || `Failed to reserve concert.`);
      console.error(err);
    } finally {
      setActionInProgress(null);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 max-w-3xl">
        <div className="space-y-6">
          {concerts.list.length === 0 && (
            <p>No concerts available at the moment.</p>
          )}
          {concerts.list.map((concert) => {
            const userReservationForThisConcert = userActiveReservations.find(
              (r) => r.concertId === concert.id
            );
            const isReservedByCurrentUser = !!userReservationForThisConcert;
            const isProcessing = actionInProgress === concert.id;

            return (
              <ConcertCard
                permission="user"
                key={concert.id}
                concert={concert}
                onReserve={() => handleReserve(concert.id)}
                isReservedByCurrentUser={isReservedByCurrentUser}
                isProcessing={isProcessing}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
