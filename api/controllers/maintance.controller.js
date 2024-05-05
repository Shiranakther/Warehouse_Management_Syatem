import Maintenance from '../models/maintance.model.js';

export const createMaintenanceTask = async (req, res) => {
  try {
    const {
      maintenanceId,  
      taskTitle,
      description,
      equipmentFacility,
      maintenanceType,
      scheduledDateTime,
      duration,
      assignedTechnician,
      assignedTechnicianContact,
      priority,
      costEstimation
    } = req.body;

    const newMaintenanceTask = new Maintenance({
      maintenanceId,
      taskTitle,
      description,
      equipmentFacility,
      maintenanceType,
      scheduledDateTime,
      duration,
      assignedTechnician,
      assignedTechnicianContact,
      priority,
      costEstimation
    });

    await newMaintenanceTask.save();

    res.status(201).json({
      success: true,
      message: 'Maintenance task created successfully',
      maintenanceTask: newMaintenanceTask
    });
  } catch (error) {
    console.error('Error creating maintenance task:', error);
    res.status(500).json({ success: false, message: 'Failed to create maintenance task' });
  }
};

export const getAllMaintenanceTasks = async (req, res) => {
    try {
      // Fetch all maintenance tasks from the database
      const maintenanceTasks = await Maintenance.find();
      res.status(200).json(maintenanceTasks);
    } catch (error) {
      console.error('Error fetching maintenance tasks:', error);
      res.status(500).json({ message: 'Failed to fetch maintenance tasks' });
    }
  };

  export const deleteMaintenanceTask = async (req, res) => {
    try {
      // Extract task ID from request parameters
      const id = req.params.id;
  
      // Find the maintenance task by ID and delete it
      const deletedTask = await Maintenance.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Maintenance task not found' });
      }
  
      res.status(200).json({ message: 'Maintenance task deleted successfully', deletedTask });
    } catch (error) {
      console.error('Error deleting maintenance task:', error);
      res.status(500).json({ message: 'Failed to delete maintenance task' });
    }
  };

  export const updateMaintenanceTask = async (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
  
    try {
      const oldTask = await Maintenance.findById(id);
      if (!oldTask) {
        return res.status(404).json({ message: 'Maintenance task not found' });
      }
  
      const task = await Maintenance.findByIdAndUpdate(id, updatedTask, { new: true });
  
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getMaintenanceTaskById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const maintenanceTask = await Maintenance.findById(id);
      if (!maintenanceTask) {
        return res.status(404).json({ message: 'Maintenance task not found' });
      }
      res.status(200).json(maintenanceTask);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  