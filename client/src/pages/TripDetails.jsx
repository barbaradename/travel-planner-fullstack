import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItinerary, deleteItinerary, getToken } from "../services/api";

export default function TripDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setError("");

      if (!getToken()) {
        navigate("/login");
        return;
      }

      try {
        const data = await getItinerary(id);
        setTrip(data.itinerary);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id, navigate]);

  async function handleDelete() {
    const ok = window.confirm("Delete this trip? This cannot be undone.");
    if (!ok) return;

    setError("");
    try {
      await deleteItinerary(id);
      navigate("/my-trips");
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;

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
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
      >
        <div>
          <h2 style={{ margin: 0 }}>{trip.city}</h2>
          <p style={{ margin: "6px 0", color: "#666" }}>
            {trip.days} days {trip.budget ? `• Budget: ${trip.budget}` : ""}
          </p>
          {Array.isArray(trip.interests) && trip.interests.length > 0 && (
            <p style={{ margin: 0, color: "#666" }}>
              Interests: {trip.interests.join(", ")}
            </p>
          )}
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => navigate("/my-trips")}>Back</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      <div style={{ marginTop: 16 }}>
        <h3>Itinerary</h3>

        {Array.isArray(trip.plan) && trip.plan.length > 0 ? (
          trip.plan.map((d) => (
            <div
              key={d.day}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                borderRadius: 10,
                marginBottom: 10,
              }}
            >
              <b>Day {d.day}</b>
              <div>Morning: {d.morning?.title || "—"}</div>
              <div>Afternoon: {d.afternoon?.title || "—"}</div>
              <div>Evening: {d.evening?.title || "—"}</div>
            </div>
          ))
        ) : (
          <p style={{ color: "#666" }}>No plan saved.</p>
        )}
      </div>
    </div>
  );
}
