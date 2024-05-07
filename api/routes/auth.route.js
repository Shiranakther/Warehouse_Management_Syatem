import express from 'express';
import { google, signOut, signin, signup , login, register, supplierApprove,deletePendingSupplier } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post('/google', google);
router.get('/signout', signOut);
router.post("/register", register);
router.post("/login", login);
router.post("/supplier_request", supplierApprove);
router.post("/supplier_delete/:supplierId", deletePendingSupplier);


export default router;