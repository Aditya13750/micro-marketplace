import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 REGISTER
export const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    email = email.toLowerCase().trim();
    password = password.trim();

    console.log("📩 Registration attempt:", { name, email, passLen: password.length });

    // 1. Basic Validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // 2. Check for Duplicate Email
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ msg: "User with this email already exists" });
    }

    // 3. Hash Password
    console.log("🔹 Hashing password...");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("✅ Password hashed. Hash prefix:", hashedPassword.substring(0, 10));

    // 4. Create User
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();
    console.log("🚀 User saved successfully!");

    res.status(201).json({ msg: "User registered successfully 🎉" });

  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message
    });
  }
};

// 🔐 LOGIN  ✅ IMPORTANT FIX
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase().trim();
    password = password.trim();

    console.log("🔑 Login attempt for:", email, "PassLen:", password.length);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("⚠️ User not found:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("🔍 Checking password match...");
    console.log("Stored hash prefix:", user.password.substring(0, 10));

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("📊 Result:", isMatch ? "MATCH ✅" : "NO MATCH ❌");

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("🎟️ Generating token...");
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// 👤 GET CURRENT USER
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("favorites");

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      favorites: user.favorites
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};