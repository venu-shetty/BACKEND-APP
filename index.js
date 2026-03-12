import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import { authenticateAdmin } from "./middleware/auth.js";
import mongoose from "mongoose";
import dbConnect from "./config/db.js";

// Existing routers
import productRouter from "./routes/productRoute.js";
import storeRouter from "./routes/storeRoute.js";
import homeRouter from "./routes/homeRoute.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

// New order router
import orderRouter from "./routes/orderRoute.js";

const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "layout");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Make session user available in EJS
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// Routes
app.use("/auth", authRouter);
app.use("/store", storeRouter);
app.use("/", authenticateAdmin, homeRouter);
app.use("/products", authenticateAdmin, productRouter);
app.use("/users", authenticateAdmin, userRouter);

// <-- Added order routes here
app.use("/orders", authenticateAdmin, orderRouter);

// Start server
const startServer = async () => {
  await dbConnect();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
  });
};

startServer();