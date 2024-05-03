import express from "express";
import { AddItems, GetItems, DeleteItems, UpdateItems } from '../controllers/Item.controller.js';

const router = express.Router();



//getting messages from API route
router.post('/', AddItems);
router.post('/getitem', GetItems);
router.delete('/item_delete', DeleteItems);
router.post('/Item_update', UpdateItems);

export default router;


// import express from "express";
// import {AddItems, GetItems,DeleteItems,UpdateItems,GetsingItems,GetItemreport} from '../controllers/Item.controller.js';
// import { addLostItem } from '../controllers/lostItem.controller.js';


// const router = express.Router();
// router.get('/variance', addLostItem);

// router.post('/',AddItems);
// router.post('/getitem',GetItems);
// router.post('/getitem/:ItemID', GetsingItems);
// router.delete('/item_delete',DeleteItems);
// router.put('/item_update/:ItemID',UpdateItems);
// router.get('/item_report',GetItemreport);

// export default router;