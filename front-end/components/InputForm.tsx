"use client";
import { fetchItinerary } from "@/utils/api";
import React, { FormEvent } from "react";
import Itinerary from "./Itinerary";

export default function InputForm() {
  const [destination, setDestination] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [preferences, setPreferences] = React.useState<string[]>([]);
  const [itinerary, setItinerary] = React.useState<string>("");

  const preferencesOptions = ["Food", "Adventure", "Culture"];

  const handlePreferencesChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPreferences = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setPreferences(selectedPreferences);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formData = {
      destination,
      startDate,
      endDate,
      preferences,
    };

    try {
      const response = await fetchItinerary(formData);
      console.log("response", response);
      setItinerary(response);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
      setItinerary("An error occurred while fetching the itinerary.");
    }
  };

  const formatDate = (date: string) => {
    return date ? new Date(date).toISOString().split("T")[0] : "";
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <div>
      <h1>Enter your travel details</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="destination">Destination</label>
        <br />
        <input
          type="text"
          id="destination"
          name="destination"
          onChange={handleDestinationChange}
        />
        <br />
        <label htmlFor="startDate">Start Date:</label>
        <br />
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={formatDate(startDate)}
          onChange={handleStartDateChange}
        />
        <br />
        <label htmlFor="endDate">End Date:</label>
        <br />
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={formatDate(endDate)}
          onChange={handleEndDateChange}
        />
        <br />
        <label htmlFor="preferences">Preferences:</label>
        <br />
        <select name="preferences" multiple onChange={handlePreferencesChange}>
          {preferencesOptions.map((preference) => (
            <option key={preference} value={preference}>
              {preference}
            </option>
          ))}
        </select>
        <br />
        <button type="submit"> Submit</button>
      </form>

      {itinerary && <Itinerary itinerary={itinerary} />}
    </div>
  );
}
