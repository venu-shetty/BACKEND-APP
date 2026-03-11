import express from "express"
import { showProducts } from "../controllers/storeController.js";

const storeRouter = express.Router()

// Home page
storeRouter.get("/home", (req, res) => {
  res.render("home"); 
});

// About page
storeRouter.get("/about", (req, res) => {
  res.render("about"); 
});

// Contact page
storeRouter.get("/contact", (req, res) => {
  res.render("contact"); 
});

// Menu page
storeRouter.get("/menu", (req, res) => {
  res.render("menu"); 
});

// Root route ("/") shows products
storeRouter.get("/", showProducts)

export default  storeRouter; 