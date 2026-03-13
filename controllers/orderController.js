import orderModel from '../models/orderModel.js';
const getOrders = async (req, res) => {
  const orders = await orderModel.find();
  res.render('orders/index', { orders });
};

const addOrder = async (req, res) => {
  const order = req.body;
  await orderModel.create(order);
  res.redirect('/orders');
};
const addOrderForm = async (req, res) => {  
    res.render('orders/add');
};

const deleteOrder = async (req, res) => {  
    const id = req.params.id;
  await orderModel.findByIdAndDelete(id);
  res.redirect('/orders');
};

const editOrderForm = async (req, res) => {
  const id = req.params.id;
  const order = await orderModel.findOne({ _id: id });
  res.render('orders/edit', { order });
};
const saveOrder = async (req, res) => {
    const id = req.params.id;
    const order = req.body;
    await orderModel.findByIdAndUpdate(id, order);
    res.redirect('/orders');
};
export {
  getOrders,
  addOrder,
  addOrderForm,
  deleteOrder,
  editOrderForm,
  saveOrder
};

