// admin.router.js
import express from 'express';
import { getAllPendingSuppliers, approveSupplierRegistration } from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/pending', getAllPendingSuppliers);
router.put('/approve/:supplierId', approveSupplierRegistration);

export default router;
