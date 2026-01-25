import { useEffect, useState } from "react";
import { deleteItinerary, listItineraries, getToken } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function MyTrips() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      setError("");

      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await listItineraries();
        setItems(data.itineraries || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [navigate]);

  async function handleDelete(id) {
    const ok = window.confirm("Delete this trip? This cannot be undone.");
    if (!ok) return;

    setError("");
    try {
      await deleteItinerary(id);
      setItems((prev) => prev.filter((x) => x._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <div style={{ padding: 16 }}>Loading...</div>;

  return (
    <div style={{ padding: 16, maxWidth: 800 }}>
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 10 }}
      >
        <h2>My Trips</h2>
        <button type="button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {items.length === 0 ? (
        <p>No trips yet. Go to Home and generate one 🙂</p>
      ) : (
        items.map((t) => (
          <div
            key={t._id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <b>{t.city}</b> — {t.days} days
                {t.budget && (
                  <div style={{ color: "#888" }}>Budget: {t.budget}</div>
                )}
                {Array.isArray(t.interests) && t.interests.length > 0 && (
                  <div style={{ color: "#888" }}>
                    Interests: {t.interests.join(", ")}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => navigate(`/my-trips/${t._id}`)}
                >
                  View
                </button>
                <button type="button" onClick={() => handleDelete(t._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
