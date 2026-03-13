import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import { authenticateAdmin } from "./middleware/auth.js";
import mongoose from "mongoose";
import dbConnect from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import storeRouter from "./routes/storeRoute.js";
import homeRouter from "./routes/homeRoute.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import orderModel from "./models/orderModel.js";

dotenv.config();
const app = express();

// Enable CORS for frontend React app
app.use(cors());

// EJS setup
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "layout");

// Body parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static("public"));

// Session setup
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Make user available in views
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes
app.use("/auth", authRouter);
app.use("/store", storeRouter); // store page (for React maybe)
app.use("/", authenticateAdmin, homeRouter);
app.use("/products", authenticateAdmin, productRouter);
app.use("/users", authenticateAdmin, userRouter);
app.use("/orders", authenticateAdmin, orderRouter);

// ---------------------------
// API endpoint for frontend React
// ---------------------------

// Get all orders as JSON (no admin auth required for frontend)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json(orders); // <-- returns JSON array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Optional: create order via API from frontend (cart)
app.post("/api/orders", async (req, res) => {
  try {
    const order = await orderModel.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connect to DB and start server
const startServer = async () => {
  await dbConnect();
  app.listen(5000, () => {
    console.log("Server Started on http://localhost:5000");
  });
};

startServer();