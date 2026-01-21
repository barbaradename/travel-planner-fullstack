import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ ok: false, message: "Email and password are required" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ ok: false, message: "Password must be at least 6 characters" });

    const existing = await User.findOne({ email });
    if (existing)
      return res
        .status(409)
        .json({ ok: false, message: "Email already in use" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash });

    const token = createToken(user._id);

    res.status(201).json({
      ok: true,
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.log("SIGNUP ERROR:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ ok: false, message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ ok: false, message: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid)
      return res
        .status(401)
        .json({ ok: false, message: "Invalid credentials" });

    const token = createToken(user._id);

    res.json({
      ok: true,
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ ok: false, message: err.message });
  }
});

export default router;
