import express from "express";
import Itinerary from "../models/Itinerary.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.post("/generate", requireAuth, async (req, res) => {
  try {
    const { city, days, budget, interests } = req.body;

    const activities = [
      { title: "City walking tour", tags: ["culture", "food"], price: "low" },
      { title: "Museum morning", tags: ["culture"], price: "medium" },
      { title: "Local market + tapas", tags: ["food"], price: "low" },
      { title: "Beach afternoon", tags: ["nature", "relax"], price: "low" },
      { title: "Nightlife area", tags: ["nightlife"], price: "medium" },
      { title: "Hike viewpoint", tags: ["nature"], price: "low" },
    ];

    const filtered = activities.filter((a) => {
      const matchInterest =
        !interests?.length || interests.some((t) => a.tags.includes(t));
      const matchBudget = !budget || budget === "any" || a.price === budget;
      return matchInterest && matchBudget;
    });

    const numDays = Number(days || 3);

    const plan = Array.from({ length: numDays }, (_, i) => ({
      day: i + 1,
      morning: filtered[0] || null,
      afternoon: filtered[1] || null,
      evening: filtered[2] || null,
    }));

    res.json({ ok: true, plan });
  } catch (err) {
    console.log("GENERATE ERROR:", err);
    res.status(500).json({ ok: false, message: "Generate error" });
  }
});

router.post("/", requireAuth, async (req, res) => {
  try {
    const { city, days, budget, interests, plan } = req.body;

    if (!city || !days) {
      return res
        .status(400)
        .json({ ok: false, message: "city and days are required" });
    }

    const created = await Itinerary.create({
      userId: req.userId,
      city,
      days,
      budget: budget || "any",
      interests: interests || [],
      plan: plan || [],
    });

    res.status(201).json({ ok: true, itinerary: created });
  } catch (err) {
    console.log("SAVE ITINERARY ERROR:", err);
    res.status(500).json({ ok: false, message: "Save itinerary error" });
  }
});

router.get("/", requireAuth, async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json({ ok: true, itineraries });
  } catch (err) {
    console.log("LIST ITINERARIES ERROR:", err);
    res.status(500).json({ ok: false, message: "List itineraries error" });
  }
});

/**
 * GET /api/itineraries/:id  (protegida)
 */
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!itinerary) {
      return res.status(404).json({ ok: false, message: "Not found" });
    }

    res.json({ ok: true, itinerary });
  } catch (err) {
    console.log("GET ITINERARY ERROR:", err);
    res.status(500).json({ ok: false, message: "Get itinerary error" });
  }
});

router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const deleted = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deleted) {
      return res.status(404).json({ ok: false, message: "Not found" });
    }

    res.json({ ok: true, message: "Deleted" });
  } catch (err) {
    console.log("DELETE ITINERARY ERROR:", err);
    res.status(500).json({ ok: false, message: "Delete itinerary error" });
  }
});

export default router;
