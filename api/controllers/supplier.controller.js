import Sitems from '../models/sitem.moduel.js';
import Supplier from '../models/supplier.model.js';

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({});
    res.json({ success: true, suppliers });
  } catch (error) {
    console.error('Error retrieving suppliers:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const getSItems = async (req, res) => {
  try {
    const sitems = await Sitems.find({});
    res.json({ success: true, sitems });
  } catch (error) {
    console.error('Error retrieving SItems:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
