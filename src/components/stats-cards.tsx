"use client";

import type React from "react";
import { User, X } from "lucide-react";
import { StatCardProps } from "@/types/stat-card";
import { useAtom } from "jotai";
import { concertsAtom } from "@/store/concert";
import { useReserve } from "@/hook/useReserve";
import { useEffect } from "react";
import { useState } from "react";

function StatCard({ title, value, icon, bgColor, textColor }: StatCardProps) {
  return (
    <div
      className={`${bgColor} ${textColor} rounded-lg p-6 text-center transition-all duration-300`}
    >
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-sm opacity-90 mb-1">{title}</p>
      <p className="text-4xl font-bold">{value}</p>
    </div>
  );
}

export default function StatsCards() {
  const [concerts] = useAtom(concertsAtom);
  const { getAllReservations, getCancelledReservations } = useReserve();
  const [reservations, setReservations] = useState<number>(0);
  const [cancelledReservations, setCancelledReservations] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const data = await getAllReservations();
      const cancelledData = await getCancelledReservations();

      setReservations(data);
      setCancelledReservations(cancelledData);
    })();
  }, [getAllReservations, getCancelledReservations]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total of seats"
        value={
          (
            concerts as { totalSeats: number } | undefined
          )?.totalSeats.toLocaleString() ?? 0
        }
        icon={<User className="w-6 h-6" />}
        bgColor="bg-blue-600"
        textColor="text-white"
      />
      <StatCard
        title="Reserve"
        value={reservations.toLocaleString() ?? 0}
        icon={<User className="w-6 h-6" />}
        bgColor="bg-emerald-500"
        textColor="text-white"
      />
      <StatCard
        title="Cancel"
        value={cancelledReservations.toLocaleString() ?? 0}
        icon={<X className="w-6 h-6" />}
        bgColor="bg-red-500"
        textColor="text-white"
      />
    </div>
  );
}
