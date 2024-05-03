import express from 'express';
import { addShipping, deleteShippingById, getAllShippings, getShippingById, updateShippingById } from '../controllers/shippingController.js';

const shippingRouter = express.Router();

shippingRouter.post('/', addShipping);
shippingRouter.get('/', getAllShippings);
shippingRouter.get('/:id', getShippingById);
shippingRouter.put('/:id', updateShippingById);
shippingRouter.delete('/:id', deleteShippingById);

export default shippingRouter;