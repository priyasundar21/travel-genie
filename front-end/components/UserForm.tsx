import React, { useState } from "react";

interface UserFormProps {
  onSubmit: (formData: {
    destination: string;
    startDate: string;
    endDate: string;
    preferences: string[];
  }) => void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [preferences, setPreferences] = useState<string[]>([]);

  const preferencesOptions = ["Food", "Adventure", "Culture"];

  const handlePreferencesChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPreferences = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setPreferences(selectedPreferences);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ destination, startDate, endDate, preferences });
    setDestination("");
    setStartDate("");
    setEndDate("");
    setPreferences([]);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-[#F6F4D2] p-6 rounded-lg shadow-md w-full max-w-3xl"
    >
      <div className="flex flex-col">
        <label htmlFor="destination" className="text-[#A44A3F] font-semibold">
          Destination
        </label>
        <input
          type="text"
          id="destination"
          name="destination"
          className="input w-full bg-[#CBDFBD] text-[#A44A3F]"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="startDate" className="text-[#A44A3F] font-semibold">
          Start Date
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          className="input input-bordered w-full bg-[#CBDFBD] text-[#A44A3F]"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="endDate" className="text-[#A44A3F] font-semibold">
          End Date
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          className="input input-bordered w-full bg-[#CBDFBD] text-[#A44A3F]"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="preferences" className="text-[#A44A3F] font-semibold">
          Preferences
        </label>
        <select
          name="preferences"
          className="select select-bordered w-full bg-[#CBDFBD] text-[#A44A3F]"
          onChange={handlePreferencesChange}
        >
          {preferencesOptions.map((preference) => (
            <option key={preference} value={preference}>
              {preference}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="btn rounded-4xl bg-[#F19C79] text-white hover:bg-[#A44A3F] mx-auto w-1/4"
      >
        Submit
      </button>
    </form>
  );
}
