import { useEffect, useMemo, useState } from "react";
import { generateItinerary, saveItinerary, getToken } from "../services/api";
import { useNavigate } from "react-router-dom";
import { COUNTRIES } from "../data/countries";

const INTERESTS = ["food", "culture", "nature", "nightlife", "relax"];

export default function Home() {
  const navigate = useNavigate();

  const [token, setTokenState] = useState(getToken());
  useEffect(() => {
    const onStorage = () => setTokenState(getToken());
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onStorage);
    };
  }, []);

  const isLogged = useMemo(() => Boolean(token), [token]);

  // Destination
  const [country, setCountry] = useState("Spain");
  const [city, setCity] = useState("Barcelona");

  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState("any");
  const [interests, setInterests] = useState(["food", "culture"]);

  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [loadingGen, setLoadingGen] = useState(false);
  const [loadingSave, setLoadingSave] = useState(false);

  function toggleInterest(tag) {
    setInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function getDestinationString() {
    const trimmedCity = String(city || "").trim();
    const trimmedCountry = String(country || "").trim();

    if (trimmedCity && trimmedCountry)
      return `${trimmedCity}, ${trimmedCountry}`;
    if (trimmedCountry) return trimmedCountry;
    return trimmedCity || "Unknown";
  }

  async function handleGenerate() {
    setError("");

    if (!isLogged) {
      navigate("/login");
      return;
    }

    setLoadingGen(true);
    try {
      const data = await generateItinerary({
        city: getDestinationString(),
        days: Number(days),
        budget,
        interests,
      });
      setPlan(data.plan);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingGen(false);
    }
  }

  async function handleSave() {
    setError("");
    if (!plan) return;

    if (!isLogged) {
      navigate("/login");
      return;
    }

    setLoadingSave(true);
    try {
      await saveItinerary({
        city: getDestinationString(),
        days: Number(days),
        budget,
        interests,
        plan,
      });

      navigate("/my-trips");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingSave(false);
    }
  }

  return (
    <div style={{ padding: 16, maxWidth: 800 }}>
      <h2>Travel Planner</h2>

      {!isLogged && (
        <p style={{ color: "#999" }}>
          You’re not logged in. Please <b>Login</b> to generate and save trips.
        </p>
      )}

      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
        <label>
          Country
          <select value={country} onChange={(e) => setCountry(e.target.value)}>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          City (optional)
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="e.g. Barcelona"
          />
        </label>

        <label>
          Days
          <input
            value={days}
            onChange={(e) => setDays(e.target.value)}
            type="number"
            min="1"
            max="14"
          />
        </label>

        <label>
          Budget
          <select value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="any">Any</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
          </select>
        </label>

        <div style={{ gridColumn: "1 / -1" }}>
          <div>Interests</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {INTERESTS.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => toggleInterest(tag)}
                style={{
                  border: "1px solid #ddd",
                  padding: "6px 10px",
                  borderRadius: 999,
                  background: interests.includes(tag) ? "#eee" : "white",
                  cursor: "pointer",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
        <button onClick={handleGenerate} disabled={loadingGen || !isLogged}>
          {loadingGen ? "Generating..." : "Generate Itinerary"}
        </button>

        <button
          onClick={handleSave}
          disabled={!plan || loadingSave || !isLogged}
        >
          {loadingSave ? "Saving..." : "Save Trip"}
        </button>
      </div>

      {error && <p style={{ color: "crimson" }}>{error}</p>}

      {plan && (
        <div style={{ marginTop: 16 }}>
          <h3>Itinerary</h3>
          {plan.map((d) => (
            <div
              key={d.day}
              style={{
                border: "1px solid #ddd",
                padding: 12,
                marginBottom: 10,
                borderRadius: 10,
              }}
            >
              <b>Day {d.day}</b>
              <div>
                Morning: {d.morning?.title || "—"}
                {d.morning?.tip ? (
                  <div style={{ color: "#666" }}>Tip: {d.morning.tip}</div>
                ) : null}
              </div>
              <div>
                Afternoon: {d.afternoon?.title || "—"}
                {d.afternoon?.tip ? (
                  <div style={{ color: "#666" }}>Tip: {d.afternoon.tip}</div>
                ) : null}
              </div>
              <div>
                Evening: {d.evening?.title || "—"}
                {d.evening?.tip ? (
                  <div style={{ color: "#666" }}>Tip: {d.evening.tip}</div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
