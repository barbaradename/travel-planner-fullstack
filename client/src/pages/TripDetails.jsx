import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItinerary } from "../services/api";

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getItinerary(id);
        setTrip(data.itinerary || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;

  if (error) {
    return (
      <div style={{ padding: 16 }}>
        <p style={{ color: "crimson" }}>{error}</p>
        <button onClick={() => navigate("/my-trips")}>Back</button>
      </div>
    );
  }

  if (!trip) {
    return (
      <div style={{ padding: 16 }}>
        <p>Trip not found.</p>
        <button onClick={() => navigate("/my-trips")}>Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 16, maxWidth: 900 }}>
      <button onClick={() => navigate("/my-trips")}>← Back to My Trips</button>

      <h2 style={{ marginTop: 12 }}>
        {trip.city} — {trip.days} days
      </h2>

      {trip.budget && (
        <div style={{ color: "#666" }}>Budget: {trip.budget}</div>
      )}

      {Array.isArray(trip.interests) && trip.interests.length > 0 && (
        <div style={{ color: "#666" }}>
          Interests: {trip.interests.join(", ")}
        </div>
      )}

      <h3 style={{ marginTop: 20 }}>Itinerary</h3>

      {Array.isArray(trip.itinerary) && trip.itinerary.length > 0 ? (
        trip.itinerary.map((day, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <strong>Day {index + 1}</strong>

            {Array.isArray(day.activities) && (
              <ul style={{ marginTop: 8 }}>
                {day.activities.map((activity, i) => (
                  <li key={i}>{activity}</li>
                ))}
              </ul>
            )}
          </div>
        ))
      ) : (
        <p>No itinerary details available.</p>
      )}
    </div>
  );
}
