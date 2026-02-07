import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auroraImg from "../assets/aurora.jpeg";
import { DESTINATIONS } from "../data/destinations";
import { getToken, saveItinerary } from "../services/api";

const CLIMATE = [
  { value: "cold", label: "Cold ❄️" },
  { value: "mild", label: "Mild 🌤️" },
  { value: "warm", label: "Warm ☀️" },
];

const VIBE = [
  { value: "nature", label: "Nature" },
  { value: "city", label: "City" },
  { value: "culture", label: "Culture" },
];

const LANDSCAPE = [
  { value: "beach", label: "Beach" },
  { value: "mountains", label: "Mountains" },
  { value: "countryside", label: "Countryside" },
  { value: "waterfalls", label: "Waterfalls" },
];

const TIME = [
  { value: "day", label: "Day person 🌞" },
  { value: "night", label: "Night person 🌙" },
];

const BUDGET = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "any", label: "Any" },
];

function buildPlaceholderPlan(countryName) {
  return [
    {
      day: 1,
      morning: {
        title: `Explore the highlights of ${countryName}`,
        tip: "Start in the most popular area.",
      },
      afternoon: {
        title: "Local food + culture",
        tip: "Try a traditional dish and visit a landmark.",
      },
      evening: {
        title: "Sunset / night vibe",
        tip: "Find a viewpoint or a lively neighborhood.",
      },
    },
    {
      day: 2,
      morning: {
        title: "Nature or landscape day",
        tip: "Pick a scenic spot based on your preferences.",
      },
      afternoon: {
        title: "Must-see attraction",
        tip: "Book tickets if needed.",
      },
      evening: {
        title: "Relax",
        tip: "Keep the evening flexible.",
      },
    },
    {
      day: 3,
      morning: {
        title: "Hidden gems",
        tip: "Explore smaller streets and local cafés.",
      },
      afternoon: {
        title: "Shopping / souvenirs",
        tip: "Support local crafts.",
      },
      evening: {
        title: "Final dinner",
        tip: "Choose a signature restaurant.",
      },
    },
  ];
}

function scoreDestination(dest, answers) {
  const tags = dest.tags || {};
  const match = (arr, value) => Array.isArray(arr) && arr.includes(value);

  let score = 0;

  // Strong matches
  if (match(tags.climate, answers.climate)) score += 5;
  if (match(tags.landscape, answers.landscape)) score += 5;
  if (match(tags.vibe, answers.vibe)) score += 4;

  // Soft matches
  if (match(tags.time, answers.time)) score += 2;
  if (answers.budget === "any" || match(tags.budget, answers.budget))
    score += 1;

  // Penalty for opposite climate (prevents Sweden when you pick warm)
  const oppositeClimate = { warm: "cold", cold: "warm" };
  if (
    oppositeClimate[answers.climate] &&
    match(tags.climate, oppositeClimate[answers.climate])
  ) {
    score -= 6;
  }

  // Penalize destinations with too few tags (avoid random picks)
  const tagsCount =
    (tags.climate?.length || 0) +
    (tags.vibe?.length || 0) +
    (tags.landscape?.length || 0);

  if (tagsCount < 2) score -= 3;

  return score;
}

export default function Home() {
  const navigate = useNavigate();
  const isLogged = Boolean(getToken());

  const [answers, setAnswers] = useState({
    age: "",
    climate: "mild",
    vibe: "culture",
    landscape: "beach",
    time: "day",
    budget: "any",
  });

  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [savingSlug, setSavingSlug] = useState("");

  const top3 = useMemo(() => results.slice(0, 3), [results]);

  function handleChange(key, value) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function handleFind() {
    setError("");

    const ranked = DESTINATIONS.map((d) => ({
      ...d,
      _score: scoreDestination(d, answers),
    })).sort((a, b) => b._score - a._score);

    setResults(ranked);
  }

  async function handleSave(dest) {
    setError("");

    if (!isLogged) {
      navigate("/login");
      return;
    }

    setSavingSlug(dest.slug);

    try {
      const planToSave =
        Array.isArray(dest.plan) && dest.plan.length > 0
          ? dest.plan
          : buildPlaceholderPlan(dest.name);

      await saveItinerary({
        city: dest.name, // using "city" field as country name for now
        days: planToSave.length,
        budget: answers.budget,
        interests: [
          answers.vibe,
          answers.landscape,
          answers.climate,
          answers.time,
        ].filter(Boolean),
        plan: planToSave,
      });

      navigate("/my-trips");
    } catch (err) {
      setError(err.message);
    } finally {
      setSavingSlug("");
    }
  }

  return (
    <div>
      {/* HERO */}
      <section
        style={{
          width: "100%",
          minHeight: "70vh",
          backgroundImage: `linear-gradient(to bottom, rgba(7,10,18,0.15), rgba(7,10,18,0.92)), url(${auroraImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="container"
          style={{ paddingTop: 80, paddingBottom: 80 }}
        >
          <div style={{ maxWidth: 820 }}>
            <div
              style={{
                color: "rgba(255,255,255,0.75)",
                letterSpacing: 1,
                textTransform: "uppercase",
                fontSize: 13,
              }}
            >
              AI-powered travel planning
            </div>

            <h1
              style={{ fontSize: 58, margin: "12px 0 12px", lineHeight: 1.02 }}
            >
              Discover your next best destination
            </h1>

            <p
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: 16,
                maxWidth: 680,
              }}
            >
              Let your interests guide you. We design the journey — you live it.
            </p>

            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 18,
                flexWrap: "wrap",
              }}
            >
              {!isLogged ? (
                <>
                  <button
                    className="btn btnPrimary"
                    onClick={() => navigate("/signup")}
                  >
                    Create your account
                  </button>
                  <button className="btn" onClick={() => navigate("/login")}>
                    Login
                  </button>
                </>
              ) : (
                <button
                  className="btn btnPrimary"
                  onClick={() => {
                    const el = document.getElementById("quiz");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Start the quiz
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* QUIZ */}
      <section id="quiz" className="band">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h2 className="sectionTitle">FIND YOUR DESTINATION</h2>
            <p className="sectionText">
              Choose your preferences and we’ll suggest the best match.
            </p>
          </div>

          <div className="plannerGrid" style={{ marginTop: 26 }}>
            <label>
              Age (optional)
              <input
                className="input"
                value={answers.age}
                onChange={(e) => handleChange("age", e.target.value)}
                placeholder="e.g. 29"
                type="number"
                min="0"
              />
            </label>

            <label>
              Budget
              <select
                value={answers.budget}
                onChange={(e) => handleChange("budget", e.target.value)}
              >
                {BUDGET.map((x) => (
                  <option key={x.value} value={x.value}>
                    {x.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Climate
              <select
                value={answers.climate}
                onChange={(e) => handleChange("climate", e.target.value)}
              >
                {CLIMATE.map((x) => (
                  <option key={x.value} value={x.value}>
                    {x.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Vibe
              <select
                value={answers.vibe}
                onChange={(e) => handleChange("vibe", e.target.value)}
              >
                {VIBE.map((x) => (
                  <option key={x.value} value={x.value}>
                    {x.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Landscape
              <select
                value={answers.landscape}
                onChange={(e) => handleChange("landscape", e.target.value)}
              >
                {LANDSCAPE.map((x) => (
                  <option key={x.value} value={x.value}>
                    {x.label}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Day or night
              <select
                value={answers.time}
                onChange={(e) => handleChange("time", e.target.value)}
              >
                {TIME.map((x) => (
                  <option key={x.value} value={x.value}>
                    {x.label}
                  </option>
                ))}
              </select>
            </label>

            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <button className="btn btnPrimary" onClick={handleFind}>
                Find my destination
              </button>
              {error && <span style={{ color: "#fb7185" }}>{error}</span>}
            </div>
          </div>

          {/* RESULTS */}
          {top3.length > 0 && (
            <div style={{ marginTop: 34 }}>
              <div style={{ textAlign: "center" }}>
                <h2 className="sectionTitle">TOP MATCHES</h2>
                <p className="sectionText">
                  Explore a country or save it to My Trips.
                </p>
              </div>

              <div
                style={{
                  marginTop: 18,
                  display: "grid",
                  gap: 14,
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                }}
              >
                {top3.map((d) => {
                  const previewPlan =
                    Array.isArray(d.plan) && d.plan.length > 0
                      ? d.plan
                      : buildPlaceholderPlan(d.name);

                  const day1 = previewPlan[0];

                  return (
                    <div
                      key={d.slug}
                      style={{
                        padding: 16,
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.12)",
                        background: "rgba(0,0,0,0.22)",
                        display: "grid",
                        gap: 10,
                      }}
                    >
                      <div style={{ fontWeight: 900, fontSize: 18 }}>
                        {d.name}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.70)",
                          lineHeight: 1.5,
                        }}
                      >
                        {d.tagline}
                      </div>

                      <div
                        style={{
                          color: "rgba(255,255,255,0.75)",
                          fontSize: 14,
                          lineHeight: 1.6,
                        }}
                      >
                        <b>Mini itinerary (Day 1):</b>
                        <div>Morning: {day1?.morning?.title || "—"}</div>
                        <div>Afternoon: {day1?.afternoon?.title || "—"}</div>
                        <div>Evening: {day1?.evening?.title || "—"}</div>
                      </div>

                      <div
                        style={{ display: "flex", gap: 10, flexWrap: "wrap" }}
                      >
                        <Link className="btn" to={`/destinations/${d.slug}`}>
                          View
                        </Link>

                        <button
                          className="btn btnPrimary"
                          onClick={() => handleSave(d)}
                          disabled={savingSlug === d.slug}
                        >
                          {savingSlug === d.slug ? "Saving..." : "Save"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bandAlt">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h2 className="sectionTitle">HOW IT WORKS</h2>
            <p
              className="sectionText"
              style={{ maxWidth: 760, margin: "0 auto" }}
            >
              1) Answer a few questions • 2) Get your top matches • 3) View tips
              and a mini itinerary • 4) Save your favorite to My Trips.
            </p>
          </div>

          <div
            style={{
              marginTop: 22,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
            }}
          >
            <div className="glassCard">
              <b>Personalized match</b>
              <div className="muted" style={{ marginTop: 8 }}>
                We rank destinations based on climate, vibe and landscape
                preferences.
              </div>
            </div>

            <div className="glassCard">
              <b>Mini itinerary</b>
              <div className="muted" style={{ marginTop: 8 }}>
                Each destination shows a small plan preview to inspire your
                trip.
              </div>
            </div>

            <div className="glassCard">
              <b>Save to My Trips</b>
              <div className="muted" style={{ marginTop: 8 }}>
                Save your favorite destination and keep it in your personal
                list.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="band">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h2 className="sectionTitle">ABOUT</h2>
            <p
              className="sectionText"
              style={{ maxWidth: 780, margin: "0 auto" }}
            >
              Travel Planner is a full-stack MERN project with authentication,
              protected routes and a personal saved trips list. The destination
              quiz helps users find a country that fits their preferences and
              provides a mini itinerary with tips.
            </p>
          </div>
        </div>
      </section>

      <footer
        style={{
          padding: "26px 18px",
          textAlign: "center",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        © {new Date().getFullYear()} Travel Planner
      </footer>
    </div>
  );
}
