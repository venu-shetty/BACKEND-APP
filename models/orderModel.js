import mongoose from 'mongoose';
const orderSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    quantity: { type: Number, required: true }
  }]
});
const orderModel = mongoose.model('orders', orderSchema);
export default orderModel;