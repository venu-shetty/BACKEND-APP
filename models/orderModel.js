import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true }
});

export default mongoose.model("Order", orderSchema);