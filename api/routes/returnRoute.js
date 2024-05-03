// const express = require('express');
// const router = express.Router();
// const {
//     getReturns,
//     createReturn,
//     getReturn,
//     deleteReturn,
//     updateReturn,
//     } = require('../controllers/returnController');

// router.get('/getAllReturns', getReturns);
// router.post('/createReturn', createReturn);
// router.get('/getReturn/:id', getReturn);
// router.delete('/deleteReturn/:id', deleteReturn);
// router.put('/updateReturn/:id', updateReturn);

// 

import express from 'express';
import { 
    getReturns,
    createReturn,
    getReturn,
    deleteReturn,
    updateReturn,
} from '../controllers/returnController.js';

const router = express.Router();

router.get('/getAllReturns', getReturns);
router.post('/createReturn', createReturn);
router.get('/getReturn/:id', getReturn);
router.delete('/deleteReturn/:id', deleteReturn);
router.put('/updateReturn/:id', updateReturn);

export default router; // Export the router
