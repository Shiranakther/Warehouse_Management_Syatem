import express from 'express';
import { addVehicle, deleteVehicleById, getAllVehicles, getVehicleById, updateVehicleById } from '../controllers/vehicleController.js';

const vehicleRouter = express.Router();

vehicleRouter.post('/add', addVehicle);
vehicleRouter.get('/', getAllVehicles);
vehicleRouter.get('/:id', getVehicleById);
vehicleRouter.put('/:id', updateVehicleById);
vehicleRouter.delete('/:id', deleteVehicleById);

export default vehicleRouter;
