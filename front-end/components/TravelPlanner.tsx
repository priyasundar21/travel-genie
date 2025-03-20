"use client";
import { fetchItinerary } from "@/utils/api";
import React, { useState } from "react";
import Itinerary from "./Itinerary";
import Loading from "./Loading";
import UserForm from "./UserForm";

export default function TravelPlanner() {
  const [itinerary, setItinerary] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGenerateItinerary = async (formData: {
    destination: string;
    startDate: string;
    endDate: string;
    preferences: string[];
  }) => {
    setLoading(true);
    try {
      const response = await fetchItinerary(formData);
      console.log("response", response);
      setItinerary(response);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
      setItinerary("An error occurred while fetching the itinerary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#D4E09B] p-6">
      <h1 className="text-3xl font-bold text-[#A44A3F] mb-10">
        Travel Genie - Your Itinerary Generator
      </h1>

      <UserForm onSubmit={handleGenerateItinerary} />
      {loading && <Loading />}
      {itinerary && !loading && <Itinerary itinerary={itinerary} />}
    </div>
  );
}
