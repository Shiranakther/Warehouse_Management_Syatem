import express from 'express';
import { createMaintenanceTask, getAllMaintenanceTasks, deleteMaintenanceTask,getMaintenanceTaskById,updateMaintenanceTask} from '../controllers/maintance.controller.js';

const router = express.Router();



router.post("/create_maintence_task",createMaintenanceTask);
router.get("/MaintenanceListPage",getAllMaintenanceTasks);
router.delete("/delete_maintenance_task/:id", deleteMaintenanceTask);
router.get("/get_maintenance_task/:id",getMaintenanceTaskById);
router.put('/update_maintenance_task/:id',updateMaintenanceTask);









export default router;

