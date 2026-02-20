import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ["https://micro-marketplace-opal.vercel.app", "http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);