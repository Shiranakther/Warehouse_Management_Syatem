import express from 'express';
import * as supplierController from '../controllers/supplier.controller.js';

const router = express.Router();

// Routes for suppliers
router.get('/', supplierController.getSuppliers);
router.get('/sitems', supplierController.getSItems); // Endpoint for getting supplier items

export default router;