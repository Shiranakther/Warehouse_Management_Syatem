// admin.controller.js
import PendingSupplier from '../models/pendingSupplier.model.js';

export const getAllPendingSuppliers = async (req, res, next) => {
  try {
    const pendingSuppliers = await PendingSupplier.find();
    res.status(200).json(pendingSuppliers);
  } catch (error) {
    next(error);
  }
};

export const approveSupplierRegistration = async (req, res, next) => {
  const { supplierId } = req.params;
  try {
    const pendingSupplier = await PendingSupplier.findById(supplierId);
    if (!pendingSupplier) {
      return res.status(404).json({ message: 'Pending supplier not found' });
    }
    // Implement approval logic here
    // Move pending supplier to approved suppliers collection
    // Optionally, you can perform any additional actions such as sending confirmation emails
    res.status(200).json({ message: 'Supplier registration approved' });
  } catch (error) {
    next(error);
  }
};
