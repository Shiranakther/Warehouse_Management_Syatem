import vehicleModel from "../models/vehicleModel.js";

export const addVehicle = async (req, res) => {
  try {
    const newVehicle = await vehicleModel.create(req.body);
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleModel.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await vehicleModel.findById(req.params.id);
    if (!vehicle) {
      res.status(404).json({ message: 'Vehicle not found' });
      return;
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVehicleById = async (req, res) => {
  try {
    const updateVehicle = await vehicleModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateVehicle) {
      res.status(404).json({ message: 'Delivery not found' });
      return;
    }
    res.status(200).json(updateVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteVehicleById = async (req, res) => {
  try {
    const deletedVehicle = await vehicleModel.findByIdAndDelete(req.params.id);
    if (!deletedVehicle) {
      res.status(404).json({ message: 'Vehicle not found' });
      return;
    }
    res.status(200).json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
