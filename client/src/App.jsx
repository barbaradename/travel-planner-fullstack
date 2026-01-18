import { useState } from "react";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("Barcelona");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("any");
  const [interests, setInterests] = useState(["food"]);
  const [result, setResult] = useState(null);

  function toggleInterest(tag) {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  async function generate() {
    const res = await fetch("/api/itineraries/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city, days, budget, interests }),
    });
    const data = await res.json();
    setResult(data);
  }

  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
      <h1>Travel Planner Fullstack</h1>

      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        <label>
          City
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <label>
          Days
          <input
            type="number"
            value={days}
            min="1"
            max="14"
            onChange={(e) => setDays(e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          />
        </label>

        <label>
          Budget
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
          >
            <option value="any">Any</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
          </select>
        </label>

        <div>
          Interests
          <div
            style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 }}
          >
            {["food", "culture", "nature", "nightlife", "relax"].map((tag) => (
              <button
                key={tag}
                onClick={() => toggleInterest(tag)}
                style={{
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: "1px solid #555",
                  background: interests.includes(tag) ? "#222" : "transparent",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={generate}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          Generate itinerary
        </button>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3>Result</h3>
        <pre style={{ background: "#111", padding: 16, borderRadius: 10 }}>
          {result ? JSON.stringify(result, null, 2) : "No result yet"}
        </pre>
      </div>
    </div>
  );
}
