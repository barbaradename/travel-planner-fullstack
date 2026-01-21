import mongoose from "mongoose";

const itinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    city: { type: String, required: true },
    days: { type: Number, required: true },
    budget: { type: String, default: "any" },
    interests: { type: [String], default: [] },

    plan: { type: Array, default: [] }, // simples por enquanto
  },
  { timestamps: true },
);

export default mongoose.model("Itinerary", itinerarySchema);
