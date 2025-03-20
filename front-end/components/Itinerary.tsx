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
    const itineraryData: ItineraryDay[] = JSON.parse(itinerary);

    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Your Itinerary</h1>
        {itineraryData.map((day, index) => (
          <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">{day.title}</h2>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              {day.activities.map((activity, i) => (
                <li key={i}>
                  <span className="font-semibold">{activity.timeOfTheDay}:</span> {activity.activity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      // fallback approach if the above doesn't work
    );
}
