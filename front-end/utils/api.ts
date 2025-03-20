import axios from "axios";

interface FormDataProps {
  destination: string;
  startDate: string;
  endDate: string;
  preferences: string[];
}

export const fetchItinerary = async (data: FormDataProps) => {
  const response = await axios.post(
    "http://localhost:5000/api/generate-itinerary",
    data
  );
  console.log("Response from server", response.data);
  return response.data.itinerary;
};
