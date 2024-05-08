import express from 'express';
import { createPO, deletePO, updatePO, getPO, getPOs } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createPO);
router.delete('/delete/:id', verifyToken, deletePO);
router.post('/update/:id', verifyToken, updatePO);
router.get('/get/:id', getPO);
router.get('/get', getPOs);

export default router;
