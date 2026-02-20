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


const allowedOrigins = [
  "http://localhost:5173",
  "https://micro-marketplace-opal.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/user", userRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API Running ");
});

// Error middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(` Server running on port ${PORT}`)
);