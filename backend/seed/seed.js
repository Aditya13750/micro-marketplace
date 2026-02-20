import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

dotenv.config();
await connectDB();

// USERS
const users = [
  {
    name: "Aditya",
    email: "aditya@test.com",
    password: await bcrypt.hash("123456", 10)
  },
  {
    name: "Demo User",
    email: "demo@test.com",
    password: await bcrypt.hash("123456", 10)
  }
];

// PRODUCTS
const products = [
  {
    title: "Premium Wireless Headphones",
    price: 15999,
    description: "Industry-leading noise canceling with Dual Noise Sensor technology. Up to 30-hour battery life and quick charging.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    category: "Electronics"
  },
  {
    title: "Eco-Friendly Yoga Mat",
    price: 2499,
    description: "Non-slip surface made from recycled materials. Perfect for all levels of yoga and pilates.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    category: "Fitness"
  },
  {
    title: "Mechanical Gaming Keyboard",
    price: 8990,
    description: "RGB backlit keys with customizable software. Designed for precision and speed during intense gaming sessions.",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
    category: "Electronics"
  },
  {
    title: "Insulated Stainless Steel Bottle",
    price: 1200,
    description: "Keep your drinks cold for 24 hours or hot for 12. Durable powder-coated finish and leak-proof lid.",
    image: "https://images.unsplash.com/photo-1602143307185-83cd3cb45244?w=800&q=80",
    category: "Accessories"
  },
  {
    title: "Ultra-Light Running Shoes",
    price: 4500,
    description: "Breathable mesh upper and responsive cushioning for ultimate comfort and performance on the track.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    category: "Footwear"
  },
  {
    title: "Professional DSLR Camera",
    price: 85000,
    description: "Capture stunning photos and 4K videos with this versatile mirrorless camera. Includes 24-70mm lens kit.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80",
    category: "Electronics"
  },
  {
    title: "Smart Home Speaker",
    price: 3999,
    description: "Control your home with your voice. Crisp sound quality and seamless integration with smart devices.",
    image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=800&q=80",
    category: "Electronics"
  },
  {
    title: "Leather Laptop Briefcase",
    price: 12500,
    description: "Handcrafted from genuine top-grain leather. Padded compartments for laptops up to 15.6 inches.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    category: "Accessories"
  },
  {
    title: "Compact Espresso Machine",
    price: 18900,
    description: "Bring the cafe home with this easy-to-use espresso maker. Features 15-bar pressure for perfect crema.",
    image: "https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?w=800&q=80",
    category: "Home Appliances"
  },
  {
    title: "Minimalist Desk Lamp",
    price: 2199,
    description: "Adjustable brightness and color temperature. Sleek design fits any workspace or bedroom.",
    image: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=800&q=80",
    category: "Home Decor"
  }
];

const seedData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    await User.insertMany(users);
    await Product.insertMany(products);

    console.log("🌱 Data Seeded Successfully");
    process.exit();
  } catch (error) {
    if (error.name === "ValidationError") {
      console.error("❌ Validation Error details:");
      for (const field in error.errors) {
        console.error(`- ${field}: ${error.errors[field].message}`);
      }
    } else {
      console.error(error);
    }
    process.exit(1);
  }
};

seedData();