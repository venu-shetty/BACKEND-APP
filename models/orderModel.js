import express from "express";
import {
  getOrders,
  addOrderForm,
  addOrder,
  editOrderForm,
  saveOrder,
  deleteOrder,
  getOrdersJSON,
  addOrderJSON
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// EJS Admin routes
orderRouter.get("/", getOrders);
orderRouter.get("/add", addOrderForm);
orderRouter.post("/", addOrder);
orderRouter.get("/:id/edit", editOrderForm);
orderRouter.post("/:id", saveOrder);
orderRouter.get("/delete/:id", deleteOrder);

// JSON API routes for React
orderRouter.get("/api/orders", getOrdersJSON);
orderRouter.post("/api/orders", addOrderJSON);

export default orderRouter;