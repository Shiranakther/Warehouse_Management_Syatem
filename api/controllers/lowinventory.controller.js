
import LowInventory from '../models/lowinventory.model.js';
import { errorHandler } from '../utils/error.js';

// Create a new low inventory item
export const createLowInventory = async (req, res, next) => {
  try {
    const { itemCode, itemName, newlevel, curruntlevel, userRef } = req.body;

    // Create a new low inventory item with the provided data
    const lowinventory = await LowInventory.create({
      itemCode,
      itemName,
      newlevel,
      curruntlevel,
      userRef,
    });

    return res.status(201).json(lowinventory);
  } catch (error) {
    next(error);
  }
};

// Delete a low inventory item by its ID
export const deleteLowInventory = async (req, res, next) => {
  try {
    const lowinventory = await LowInventory.findById(req.params.id);

    if (!lowinventory) {
      return next(errorHandler(404, 'Low inventory item not found!'));
    }

    // Check if the current user is authorized to delete the item
    if (req.user.id !== lowinventory.userRef) {
      return next(errorHandler(401, 'You can only delete your own low inventory items!'));
    }

    // Delete the low inventory item
    await LowInventory.findByIdAndDelete(req.params.id);
    res.status(200).json('Low inventory item has been deleted!');
  } catch (error) {
    next(error);
  }
};

// Update a low inventory item by its ID
export const updateLowInventory = async (req, res, next) => {
  try {
    const lowinventory = await LowInventory.findById(req.params.id);

    if (!lowinventory) {
      return next(errorHandler(404, 'Low inventory item not found!'));
    }

    // Check if the current user is authorized to update the item
    if (req.user.id !== lowinventory.userRef) {
      return next(errorHandler(401, 'You can only update your own low inventory items!'));
    }

    // Update the low inventory item with the provided data
    const updatedLowInventory = await LowInventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated item after update
    );

    res.status(200).json(updatedLowInventory);
  } catch (error) {
    next(error);
  }
};

// Get a low inventory item by its ID
export const getLowInventory = async (req, res, next) => {
  try {
    const lowinventory = await LowInventory.findById(req.params.id);

    if (!lowinventory) {
      return res.status(404).json({ error: 'Low inventory item not found!' });
    }

    res.status(200).json(lowinventory);
  } catch (error) {
    next(error);
  }
};

// Get all low inventory items
export const getLowInventorys = async (req, res, next) => {
  try {
    const lowInventory = await LowInventory.find();
    res.status(200).json(lowInventory);
  } catch (error) {
    next(error);
  }
};
