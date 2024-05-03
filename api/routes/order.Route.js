// import express from 'express';
// const router = express.Router();
// const {
//     getOrders,
//     createOrder,
//     getOrder,
//     deleteOrder,
//     updateOrder,
//     } = require('../controllers/order.controller');

// router.get('/getAllOrders', getOrders);
// router.post('/createOrder', createOrder);
// router.get('/getOrder/:id', getOrder);
// router.delete('/deleteOrder/:id', deleteOrder);
// router.put('/updateOrder/:id', updateOrder);


// export default router;

import express from 'express';
import { getOrders, createOrder,getOrder, updateOrder, deleteOrder } from '../controllers/order.controller.js';

const router = express.Router();

router.get('/getAllOrders', getOrders);
router.post('/createOrder', createOrder);
router.get('/getOrder/:id', getOrder);
router.delete('/deleteOrder/:id', deleteOrder);
router.put('/updateOrder/:id', updateOrder);

export default router;