type Activity = {
  timeOfTheDay: string;
  activity: string;
};

type ItineraryDay = {
  title: string;
  activities: Activity[];
};

export default function Itinerary({ itinerary }: { itinerary: string }) {
  console.log("itinerary", itinerary);

  let itineraryData: ItineraryDay[] | null = null;
  let isValidJSON = true;

  try {
    itineraryData = JSON.parse(itinerary);
    if (!Array.isArray(itineraryData)) {
      throw new Error("Invalid itinerary structure");
    }
  } catch (error) {
    console.error("Error parsing itinerary:", error);
    isValidJSON = false;
  }

  return (
    <div className="max-w-3xl mt-10 w-full mx-auto p-6 bg-[#F6F4D2] shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-[#A44A3F] mb-4 text-center">
        Your Itinerary
      </h1>
      {isValidJSON && itineraryData ? (
        itineraryData.map((day, index) => (
          <div
            key={index}
            className="mb-6 p-5 bg-[#D4E09B] rounded-lg shadow-md"
          >
            <h2 className="text-xl font-bold text-[#A44A3F]">{day.title}</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2 text-[#A44A3F]">
              {day.activities.map((activity, i) => (
                <li key={i} className="flex items-center">
                  <span className="font-semibold">
                    {activity.timeOfTheDay}:
                  </span>
                  &nbsp; {activity.activity}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <div>
          <p className="text-red-600 text-center">
            Invalid itinerary format. Here is the raw response:
          </p>
          <p className="bg-gray-200 p-4 rounded-md text-black whitespace-pre-wrap break-words">
            {itinerary}
          </p>
        </div>
      )}
    </div>
  );
}
