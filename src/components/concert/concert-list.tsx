"use client";

import { useMemo, useState } from "react";
import { ConcertCard } from "./concert-card";
import { useConcert } from "@/hook/useConcert";
import { toast } from "sonner";
import { useReserve } from "@/hook/useReserve";
import { MOCK_CURRENT_USER } from "@/constants/mockUser";

export function ConcertList() {
  const { concerts, fetchConcertsData, deleteConcert } = useConcert();
  const { reserveConcert } = useReserve();
  const concertList = useMemo(() => concerts, [concerts]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClick = async (id: string) => {
    setShowDeleteDialog(true);
  };

  const confirmDeleteConcert = async (id: string) => {
    try {
      await deleteConcert(id);
    } catch (err: any) {
      console.error("Delete operation failed:", err);
    } finally {
      await fetchConcertsData();
      toast.success("Concert deleted");
    }
  };

  const handleReserveClick = async (id: string) => {
    await reserveConcert({ concertId: id, userId: MOCK_CURRENT_USER.name });
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
            permission="admin"
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
