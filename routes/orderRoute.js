import express from 'express';
import {
  getOrders,
  addOrder,
  addOrderForm,
  deleteOrder,
  editOrderForm,
  saveOrder
} from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.get('/', getOrders);
orderRouter.get('/add', addOrderForm);
orderRouter.post('/add', addOrder);
orderRouter.get('/delete/:id', deleteOrder);
orderRouter.get('/:id/edit', editOrderForm);
orderRouter.post('/:id', saveOrder);

export default orderRouter;