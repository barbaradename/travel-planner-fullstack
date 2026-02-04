import { useEffect, useMemo, useState } from "react";
import { generateItinerary, saveItinerary, getToken } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { COUNTRIES } from "../data/countries";
import auroraImg from "../assets/aurora.jpeg";

const INTERESTS = ["food", "culture", "nature", "nightlife", "relax"];

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  const isLogged = useMemo(() => Boolean(token), [token]);

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

  function destination() {
    const c = String(country || "").trim();
    const ci = String(city || "").trim();
    if (ci && c) return `${ci}, ${c}`;
    return c || ci || "Unknown";
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
        city: destination(),
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
        city: destination(),
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
    <div>
      {/* HERO FULL WIDTH */}
      <section
        style={{
          width: "100%",
          minHeight: "80vh",
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
                    Already have an account?
                  </button>
                </>
              ) : (
                <button
                  className="btn btnPrimary"
                  onClick={() => {
                    const el = document.getElementById("planner");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Start planning
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TOURS (band style like the example) */}
      <section id="tours" className="band">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="sectionTitle">TOURS</h2>
          <p className="sectionText">
            Explore curated experiences — from aurora chasing and fjords to city
            food tours and cultural walks.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bandAlt">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="sectionTitle">HOW IT WORKS</h2>
          <p className="sectionText">
            Pick a destination, choose your days and interests, generate an
            itinerary and save it to My Trips.
          </p>
        </div>
      </section>

      {/* PLANNER (still clean, but not “card blocks”) */}
      <section id="planner" className="band">
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h2 className="sectionTitle">TRAVEL PLANNER</h2>
            <p className="sectionText">
              Choose your destination and preferences below.
              {!isLogged ? " Login to generate and save your trips." : ""}
            </p>
          </div>

          <div className="plannerGrid">
            <label>
              Country
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
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
                className="input"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Tromsø"
              />
            </label>

            <label>
              Days
              <input
                className="input"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                type="number"
                min="1"
                max="14"
              />
            </label>

            <label>
              Budget
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="any">Any</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
              </select>
            </label>

            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ marginBottom: 8, color: "rgba(255,255,255,0.75)" }}>
                Interests
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {INTERESTS.map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleInterest(tag)}
                    className="btn"
                    style={{
                      borderRadius: 999,
                      background: interests.includes(tag)
                        ? "rgba(125,211,252,0.18)"
                        : "rgba(255,255,255,0.08)",
                      borderColor: interests.includes(tag)
                        ? "rgba(125,211,252,0.35)"
                        : "rgba(255,255,255,0.12)",
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                gridColumn: "1 / -1",
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn btnPrimary"
                onClick={handleGenerate}
                disabled={loadingGen || !isLogged}
              >
                {loadingGen ? "Generating..." : "Generate Itinerary"}
              </button>

              <button
                className="btn"
                onClick={handleSave}
                disabled={!plan || loadingSave || !isLogged}
              >
                {loadingSave ? "Saving..." : "Save Trip"}
              </button>

              {error ? <span style={{ color: "#fb7185" }}>{error}</span> : null}
            </div>
          </div>

          {/* ITINERARY (clean, like a section) */}
          {plan && (
            <div style={{ marginTop: 34 }}>
              <div style={{ textAlign: "center" }}>
                <h2 className="sectionTitle">ITINERARY</h2>
                <p className="sectionText">
                  Here is your generated plan for {destination()}.
                </p>
              </div>

              <div style={{ display: "grid", gap: 14, marginTop: 22 }}>
                {plan.map((d) => (
                  <div
                    key={d.day}
                    style={{
                      padding: 18,
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 16,
                      background: "rgba(0,0,0,0.22)",
                    }}
                  >
                    <div style={{ fontWeight: 800, marginBottom: 10 }}>
                      DAY {d.day}
                    </div>

                    <div
                      style={{
                        color: "rgba(255,255,255,0.78)",
                        lineHeight: 1.6,
                      }}
                    >
                      <div style={{ marginBottom: 8 }}>
                        <b>Morning:</b> {d.morning?.title || "—"}
                        {d.morning?.tip ? (
                          <div style={{ color: "rgba(255,255,255,0.60)" }}>
                            Tip: {d.morning.tip}
                          </div>
                        ) : null}
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <b>Afternoon:</b> {d.afternoon?.title || "—"}
                        {d.afternoon?.tip ? (
                          <div style={{ color: "rgba(255,255,255,0.60)" }}>
                            Tip: {d.afternoon.tip}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <b>Evening:</b> {d.evening?.title || "—"}
                        {d.evening?.tip ? (
                          <div style={{ color: "rgba(255,255,255,0.60)" }}>
                            Tip: {d.evening.tip}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bandAlt">
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="sectionTitle">ABOUT</h2>
          <p className="sectionText">
            Travel Planner is a MERN app built for the Barcelona Code School
            Bootcamp — with authentication, protected routes, MongoDB Atlas and
            CRUD for saved itineraries.
          </p>
        </div>
      </section>

      {/* FOOTER */}
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
