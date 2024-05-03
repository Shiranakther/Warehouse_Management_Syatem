import shippingModel from "../models/shippingModel.js";

export const addShipping = async (req, res) => {
  try {
    const newShipping = await shippingModel.create(req.body);
    res.status(201).json(newShipping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllShippings = async (req, res) => {
  try {
    const Shippings = await shippingModel.find()
    .populate('vehicle');
    res.status(200).json(Shippings);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error.message);
  }
};

export const getShippingById = async (req, res) => {
  try {
    const Shipping = await shippingModel.findById(req.params.id);
    if (!Shipping) {
      res.status(404).json({ message: 'Shipping not found' });
      return;
    }
    res.status(200).json(Shipping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateShippingById = async (req, res) => {
  try {
    const updateShipping = await shippingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateShipping) {
      res.status(404).json({ message: 'Shipping not found' });
      return;
    }
    res.status(200).json(updateShipping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteShippingById = async (req, res) => {
  try {
    const deletedShipping = await shippingModel.findByIdAndDelete(req.params.id);
    if (!deletedShipping) {
      res.status(404).json({ message: 'Shipping not found' });
      return;
    }
    res.status(200).json({ message: 'Shipping deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
