import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API is running " });
});

app.post("/api/itineraries/generate", (req, res) => {
  const { city, days, interests, budget } = req.body;

  const activities = [
    { title: "City walking tour", tags: ["culture", "food"], price: "low" },
    { title: "Museum morning", tags: ["culture"], price: "medium" },
    { title: "Local food market + tapas", tags: ["food"], price: "low" },
    { title: "Beach afternoon", tags: ["nature", "relax"], price: "low" },
    { title: "Nightlife area", tags: ["nightlife"], price: "medium" },
    { title: "Hike viewpoint", tags: ["nature"], price: "low" },
  ];

  const filtered = activities.filter((a) => {
    const matchInterest =
      !interests?.length || interests.some((tag) => a.tags.includes(tag));
    const matchBudget = !budget || a.price === budget || budget === "any";
    return matchInterest && matchBudget;
  });

  const itinerary = Array.from({ length: Number(days || 3) }, (_, i) => ({
    day: i + 1,
    city: city || "Unknown",
    plan: filtered.slice(0, 3),
  }));

  res.json({ ok: true, itinerary });
});

const PORT = process.env.PORT || 4042;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
