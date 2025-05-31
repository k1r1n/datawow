"use client";

import { useMemo } from "react";
import { ConcertCard } from "./concert-card";
import { useConcert } from "@/hook/useConcert";
import { toast } from "sonner";

export function ConcertList() {
  const { concerts, fetchConcertsData, deleteConcert } = useConcert();
  const concertList = useMemo(() => concerts, [concerts]);

  const handleDeleteClick = async (id: string) => {
    await deleteConcert(id);
    await fetchConcertsData();
    toast.success("Concert deleted");
  };

  return (
    <div className="p-6">
      {concertList.totalSeats === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No concerts available. Create your first concert!</p>
        </div>
      ) : (
        concertList.list.map((concertData) => (
          <ConcertCard
            key={concertData.id}
            concert={concertData}
            onDelete={() => handleDeleteClick(concertData.id)}
          />
        ))
      )}
    </div>
  );
}
