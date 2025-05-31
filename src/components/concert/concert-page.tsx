"use client";

import { useState } from "react";
import { CreateConcertForm } from "@/components/concert/create-concert-form";
import { useConcert } from "@/hook/useConcert";
import { ConcertList } from "@/components/concert/concert-list";

export default function ConcertPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const { fetchConcertsData } = useConcert();

  const onCreateSuccess = () => {
    setActiveTab("overview");
    fetchConcertsData();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          <button
            className={`py-4 px-1 font-medium text-sm ${
              activeTab === "overview"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`py-4 px-1 font-medium text-sm ${
              activeTab === "create"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("create")}
          >
            Create
          </button>
        </nav>
      </div>

      {activeTab === "overview" ? (
        <ConcertList />
      ) : (
        <CreateConcertForm onSuccess={() => onCreateSuccess()} />
      )}
    </div>
  );
}
