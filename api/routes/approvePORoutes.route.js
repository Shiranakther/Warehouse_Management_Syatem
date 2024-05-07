import express from 'express';
import approvePOController from '../controllers/approvePOController.js';

const router = express.Router();

// Route to handle the approval of a purchase order
router.post('/approve-po', approvePOController.approvePO);

export default router;
