"use client";

import { useMemo } from "react";
import { ConcertCard } from "./concert-card";
import { useConcert } from "@/hook/useConcert";
import { toast } from "sonner";
import { useReserve } from "@/hook/useReserve";

export function ConcertList() {
  const { concerts, fetchConcertsData, deleteConcert } = useConcert();
  const { reserveConcert } = useReserve();
  const concertList = useMemo(() => concerts, [concerts]);

  const handleDeleteClick = async (id: string) => {
    await deleteConcert(id);
    await fetchConcertsData();
    toast.success("Concert deleted");
  };

  const handleReserveClick = async (id: string) => {
    await reserveConcert({ concertId: id, userId: "user.id" });
    await fetchConcertsData();
    toast.success("Concert reserved");
  };

  return (
    <div className="p-6">
      {concertList.list.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No concerts available. Create your first concert!</p>
        </div>
      ) : (
        concertList.list.map((concertData) => (
          <ConcertCard
            key={concertData.id}
            concert={concertData}
            onDelete={() => handleDeleteClick(concertData.id)}
            onReserve={() => handleReserveClick(concertData.id)}
          />
        ))
      )}
    </div>
  );
}
