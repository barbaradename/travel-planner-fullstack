import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import itineraryRoutes from "./routes/itineraryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/itineraries", itineraryRoutes);

const PORT = process.env.PORT || 4047;

async function start() {
  try {
    console.log("MONGO_URI loaded?", Boolean(process.env.MONGO_URI));

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "travel_planner",
    });

    console.log("MongoDB connected ✅");

    app.listen(PORT, () => console.log("Server running on", PORT));
  } catch (err) {
    console.log("MongoDB connect error ❌", err.message);
    process.exit(1);
  }
}

start();
