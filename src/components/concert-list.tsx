"use client";

import { useState } from "react";
import CreateConcertForm from "./create-concert-form";
import { ConcertCard } from "./concert-card";
import { useConcert } from "@/hook/useConcert";

export default function ConcertList() {
  const [activeTab, setActiveTab] = useState("overview");
  const { concerts } = useConcert();

  const handleDeleteClick = () => {};

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
        <div className="p-6">
          {concerts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No concerts available. Create your first concert!</p>
            </div>
          ) : (
            concerts.map((concertData) => (
              <ConcertCard
                key={concertData.id}
                concert={concertData}
                onDelete={() => handleDeleteClick()}
              />
            ))
          )}
        </div>
      ) : (
        <CreateConcertForm
          onSuccess={() => {
            setActiveTab("overview");
          }}
        />
      )}
    </div>
  );
}
