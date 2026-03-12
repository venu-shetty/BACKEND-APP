import orderModel from "../models/orderModel.js";

// List orders
const getorder = async (req, res) => {
  const orders = await orderModel
    .find()
    .populate("user")
    .populate("products.product");

  // If React frontend requests JSON
  if (req.headers.accept?.includes("application/json")) return res.json(orders);

  // EJS fallback
  res.render("orders/index", { orders });
};

// Show add order form (EJS)
const addorderForm = async (req, res) => {
  res.render("orders/add");
};

// Add order
const addorder = async (req, res) => {
  await orderModel.create(req.body);

  if (req.headers.accept?.includes("application/json"))
    return res.json({ message: "Order added" });

  res.redirect("/orders");
};

// Show edit order form (EJS)
const editorderForm = async (req, res) => {
  const { id } = req.params;
  const order = await orderModel.findById(id)
    .populate("user")
    .populate("products.product");

  res.render("orders/edit", { order });
};

// Save edited order
const saveorder = async (req, res) => {
  const { id } = req.params;
  await orderModel.findByIdAndUpdate(id, req.body);

  if (req.headers.accept?.includes("application/json")) {
    const updatedOrder = await orderModel.findById(id)
      .populate("user")
      .populate("products.product");
    return res.json(updatedOrder);
  }

  res.redirect("/orders");
};

// Delete order
const deleteorder = async (req, res) => {
  const { id } = req.params;
  await orderModel.findByIdAndDelete(id);

  if (req.headers.accept?.includes("application/json")) return res.json({ message: "Order deleted" });

  res.redirect("/orders");
};

export {
  getorder,
  addorder,
  addorderForm,
  editorderForm,
  saveorder,
  deleteorder
};