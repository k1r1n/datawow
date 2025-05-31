"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface HistoryEntry {
  id: number;
  dateTime: string;
  username: string;
  concertName: string;
  action: "Cancel" | "Reserve" | "Create" | "Delete";
}

export default function HistoryTable() {
  const [historyData, setHistoryData] = useState<HistoryEntry[]>([
    {
      id: 1,
      dateTime: "12/09/2024 15:00:00",
      username: "Sara John",
      concertName: "The festival Int 2024",
      action: "Cancel",
    },
    {
      id: 2,
      dateTime: "12/09/2024 10:39:20",
      username: "Sara John",
      concertName: "The festival Int 2024",
      action: "Reserve",
    },
  ]);

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
          History
        </h1>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium text-gray-900 text-xs sm:text-sm">
                  Date time
                </TableHead>
                <TableHead className="font-medium text-gray-900 text-xs sm:text-sm">
                  Username
                </TableHead>
                <TableHead className="font-medium text-gray-900 text-xs sm:text-sm">
                  Concert name
                </TableHead>
                <TableHead className="font-medium text-gray-900 text-xs sm:text-sm">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyData.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell className="text-gray-600 text-xs sm:text-sm">
                    {entry.dateTime}
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs sm:text-sm">
                    {entry.username}
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs sm:text-sm">
                    {entry.concertName}
                  </TableCell>
                  <TableCell className="text-gray-600 text-xs sm:text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        entry.action === "Create"
                          ? "bg-blue-100 text-blue-800"
                          : entry.action === "Delete"
                          ? "bg-red-100 text-red-800"
                          : entry.action === "Reserve"
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {entry.action}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
