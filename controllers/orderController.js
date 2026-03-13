import orderModel from "../models/orderModel.js";

// EJS Admin routes
const getOrders = async (req, res) => {
  const orders = await orderModel.find();
  res.render("orders/index", { orders });
};

const addOrderForm = (req, res) => {
  res.render("orders/add");
};

const addOrder = async (req, res) => {
  const order = req.body;
  await orderModel.create(order);
  res.redirect("/orders");
};

const editOrderForm = async (req, res) => {
  const id = req.params.id;
  const order = await orderModel.findById(id);
  res.render("orders/edit", { order });
};

const saveOrder = async (req, res) => {
  const id = req.params.id;
  await orderModel.findByIdAndUpdate(id, req.body);
  res.redirect("/orders");
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;
  await orderModel.findByIdAndDelete(id);
  res.redirect("/orders");
};

// API for React frontend
const getOrdersJSON = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json(orders); // send as JSON array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addOrderJSON = async (req, res) => {
  try {
    const order = await orderModel.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {
  getOrders,
  addOrderForm,
  addOrder,
  editOrderForm,
  saveOrder,
  deleteOrder,
  getOrdersJSON,
  addOrderJSON
};