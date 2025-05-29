"use client";

import { useState } from "react";
import { User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateConcertForm from "./create-concert-form";
import { ConcertCardProps } from "@/types/concert-list";

function ConcertCard({ concert, onDelete }: ConcertCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
      <h3 className="text-lg font-medium text-blue-600 mb-4">
        {concert.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        {concert.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-600">
          <User className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">
            {concert.seats.toLocaleString()}
          </span>
        </div>
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function ConcertList() {
  const [activeTab, setActiveTab] = useState("overview");
  const [concerts] = useState([]);

  const handleDeleteClick = () => {};

  const handleConfirmDelete = () => {};

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
            concerts.map((concert) => (
              <ConcertCard
                key={concert.id}
                concert={concert}
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
