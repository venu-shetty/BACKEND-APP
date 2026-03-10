import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import dotenv from "dotenv";

import dbConnect from "./config/db.js";
import productRouter from "./routes/productRoute.js";
import { storeRouter } from "./routes/storeRoute.js";
import userRouter from "./routes/userRoute.js"; 

const app = express();
dotenv.config();

// EJS Layouts
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "views");
app.set("layout", "layout");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Routes
app.use("/", storeRouter);
app.use("/products", productRouter);
app.use("/users", userRouter); 

// Redirect root to Users home
app.get("/", (req, res) => {
  res.redirect("/users");
});

// Start server
const startServer = async () => {
  await dbConnect();
  app.listen(5000, () => {
    console.log("Server Started on port 5000");
  });
};

startServer();