import Waste from '../models/wastageModel.js';

const getWastes = async (req, res) => {
    try {
        const wastes = await Waste.find();
        res.json(wastes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createWaste = async (req, res) => {   
    const wasteItem = new Waste({
        name: req.body.name,
        itemCode: req.body.itemCode,
        quantity: req.body.quantity,
        companyName: req.body.companyName,
        supplierId: req.body.supplierId,
        damageOrExpired: req.body.damageOrExpired,
        reason: req.body.reason,
    });

    try {
        const newWaste = await wasteItem.save();
        res.status(201).json(newWaste);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getWaste = async (req, res) => {
    try {
        const wasteItem = await Waste.findById(req.params.id);
        res.json(wasteItem);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteWaste = async (req, res) => {
    try {
        await Waste.findByIdAndDelete(req.params.id);
        res.json({ message: "Waste deleted" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateWaste = async (req, res) => {
    try {
        const wasteItem = await Waste.findById(req.params.id);
        wasteItem.name = req.body.name;
        wasteItem.itemCode = req.body.itemCode;
        wasteItem.quantity = req.body.quantity;
        wasteItem.companyName = req.body.companyName;
        wasteItem.supplierId = req.body.supplierId;
        wasteItem.damageOrExpired = req.body.damageOrExpired;
        wasteItem.reason = req.body.reason;

        const updatedWaste = await wasteItem.save();
        res.json(updatedWaste);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export { getWastes, createWaste, getWaste, deleteWaste, updateWaste };
