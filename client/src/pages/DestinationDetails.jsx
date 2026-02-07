import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DESTINATIONS } from "../data/destinations";
import { getToken, saveItinerary } from "../services/api";

export default function DestinationDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const token = getToken();
  const isLogged = Boolean(token);

  const destination = useMemo(
    () => DESTINATIONS.find((d) => d.slug === slug),
    [slug],
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  if (!destination) {
    return (
      <div
        style={{
          padding: 24,
          maxWidth: 1100,
          margin: "0 auto",
          color: "white",
        }}
      >
        <h2>Destination not found</h2>
        <Link to="/" style={{ color: "rgba(255,255,255,0.8)" }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  async function handleSave() {
    setError("");

    if (!isLogged) {
      navigate("/login");
      return;
    }

    setSaving(true);
    try {
      // Salvando no mesmo schema que você já tem no backend:
      // city (vamos usar o name), days (1), budget/interests tags, plan
      const payload = {
        city: destination.name,
        days: 1,
        budget: destination.tags?.budget?.[0] || "any",
        interests: destination.tags?.vibe || [],
        plan: destination.plan || [],
      };

      await saveItinerary(payload);
      navigate("/my-trips");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const day1 = destination.plan?.[0];

  return (
    <div style={{ padding: 24, maxWidth: 1100, margin: "0 auto" }}>
      {/* Top actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 16,
        }}
      >
        <button type="button" onClick={() => navigate(-1)} style={btnGhost}>
          ← Back
        </button>

        <div style={{ display: "flex", gap: 10 }}>
          <Link
            to="/"
            style={{
              ...btnGhost,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Home
          </Link>

          <button
            type="button"
            onClick={handleSave}
            style={btnPrimary}
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : isLogged
                ? "Save to My Trips"
                : "Login to Save"}
          </button>
        </div>
      </div>

      {/* Card */}
      <div style={card}>
        <h1
          style={{
            margin: 0,
            fontSize: 42,
            letterSpacing: -0.5,
            color: "white",
          }}
        >
          {destination.name}
        </h1>

        <p
          style={{
            marginTop: 10,
            maxWidth: 700,
            color: "rgba(255,255,255,0.75)",
            fontSize: 16,
            lineHeight: 1.6,
          }}
        >
          {destination.tagline}
        </p>

        {/* Highlights */}
        {Array.isArray(destination.highlights) &&
          destination.highlights.length > 0 && (
            <div style={{ marginTop: 18 }}>
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  marginBottom: 8,
                  fontWeight: 700,
                }}
              >
                Highlights
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {destination.highlights.map((h) => (
                  <span key={h} style={pill}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Mini itinerary */}
        <div style={{ marginTop: 22 }}>
          <div
            style={{
              color: "rgba(255,255,255,0.7)",
              marginBottom: 10,
              fontWeight: 700,
            }}
          >
            Mini itinerary (Day 1)
          </div>

          {day1 ? (
            <div style={miniCard}>
              <div style={{ display: "grid", gap: 10 }}>
                <Row
                  label="Morning"
                  value={day1.morning?.title}
                  tip={day1.morning?.tip}
                />
                <Row
                  label="Afternoon"
                  value={day1.afternoon?.title}
                  tip={day1.afternoon?.tip}
                />
                <Row
                  label="Evening"
                  value={day1.evening?.title}
                  tip={day1.evening?.tip}
                />
              </div>
            </div>
          ) : (
            <p style={{ color: "rgba(255,255,255,0.75)" }}>
              No itinerary yet for this destination.
            </p>
          )}
        </div>

        {error && <p style={{ marginTop: 14, color: "#ff6b6b" }}>{error}</p>}
      </div>

      {/* Footer hint */}
      <p
        style={{ marginTop: 18, color: "rgba(255,255,255,0.45)", fontSize: 13 }}
      >
        Tip: Add more days, photos and videos later — for now this is a solid
        “content page” for your project.
      </p>
    </div>
  );
}

function Row({ label, value, tip }) {
  return (
    <div>
      <div style={{ color: "white", fontWeight: 800 }}>
        {label}:{" "}
        <span style={{ fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
          {value || "—"}
        </span>
      </div>
      {tip ? (
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
          {tip}
        </div>
      ) : null}
    </div>
  );
}

const card = {
  borderRadius: 18,
  padding: 22,
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "0 20px 70px rgba(0,0,0,0.35)",
};

const miniCard = {
  borderRadius: 14,
  padding: 16,
  background: "rgba(0,0,0,0.18)",
  border: "1px solid rgba(255,255,255,0.10)",
};

const pill = {
  display: "inline-flex",
  padding: "8px 10px",
  borderRadius: 999,
  background: "rgba(0,0,0,0.20)",
  border: "1px solid rgba(255,255,255,0.12)",
  color: "rgba(255,255,255,0.85)",
  fontSize: 13,
};

const btnGhost = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(0,0,0,0.18)",
  color: "white",
  cursor: "pointer",
};

const btnPrimary = {
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(99, 102, 241, 0.55)",
  background: "rgba(99, 102, 241, 0.35)",
  color: "white",
  cursor: "pointer",
};
