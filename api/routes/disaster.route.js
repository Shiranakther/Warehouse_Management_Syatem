import express from 'express';
import { getDisasters, createDisaster, getDisaster, deleteDisaster, updateDisaster } from '../controllers/disasterController.controller.js';

const router = express.Router();

router.get('getAlldisaster', getDisasters);
router.post('/createdisaster', createDisaster);
router.get('/getdisaster/:id', getDisaster);
router.delete('/deletedisaster/:id', deleteDisaster);
router.put('/updatedisaster/:id', updateDisaster);


export default router;
