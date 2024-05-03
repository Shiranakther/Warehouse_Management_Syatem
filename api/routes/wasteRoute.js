import express from 'express';
import { 
    getWastes,
    createWaste,
    getWaste,
    deleteWaste,
    updateWaste,
} from '../controllers/wastageController.js';

const router = express.Router();

router.get('/getAllWastes', getWastes);
router.post('/createWaste', createWaste);
router.get('/getWaste/:id', getWaste);
router.delete('/deleteWaste/:id', deleteWaste);
router.put('/updateWaste/:id', updateWaste);

export default router;
