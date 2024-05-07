// // import Return from '../models/returnModel.js';

// // const getReturns = async (req, res) => {
// //   try {
// //     const returns = await Return.find();
// //     res.json(returns);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // }

// // const createReturn = async (req, res) => {
// //   const returnItem = new Return({
// //     name: req.body.name,
// //     itemCode: req.body.itemCode,
// //     quantity: req.body.quantity,
// //     companyName: req.body.companyName,
// //     supplierId: req.body.supplierId,
// //     damageOrExpired: req.body.damageOrExpired,
// //     reason: req.body.reason,
// //   });

// //   try {
// //     const newReturn = await returnItem.save();
// //     res.status(201).json(newReturn);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // }

// // const getReturn = async (req, res) => {
// //   try {
// //     const returnItem = await Return.findById(req.params.id);
// //     res.json(returnItem);
// //   } catch (error) {
// //     res.status(404).json({ message: error.message });
// //   }
// // }

// // const deleteReturn = async (req, res) => {
// //   try {
// //     await Return.findByIdAndDelete(req.params.id);
// //     res.json({ message: "Return deleted" });
// //   } catch (error) {
// //     res.status(404).json({ message: error.message });
// //   }
// // }

// // const updateReturn = async (req, res) => {
// //   try {
// //     const returnItem = await Return.findById(req.params.id);
// //     returnItem.name = req.body.name;
// //     returnItem.itemCode = req.body.itemCode;
// //     returnItem.quantity = req.body.quantity;
// //     returnItem.companyName = req.body.companyName;
// //     returnItem.supplierId = req.body.supplierId;
// //     returnItem.damageOrExpired = req.body.damageOrExpired;
// //     returnItem.reason = req.body.reason;

// //     const updatedReturn = await returnItem.save();
// //     res.json(updatedReturn);
// //   } catch (error) {
// //     res.status(400).json({ message: error.message });
// //   }
// // }

// // export { getReturns, createReturn, getReturn, deleteReturn, updateReturn };



// import Disaster, { find, findById, findByIdAndDelete } from '../models/disasterModel';

// const getDisasters = async (req, res) => {
//   try {
//     const disasters = await find();
//     res.json(disasters);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }

// const createDisaster = async (req, res) => {
//   const disasterItem = new Disaster(req.body);

//   try {
//     const newDisaster = await disasterItem.save();
//     res.status(201).json(newDisaster);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

// const getDisaster = async (req, res) => {
//   try {
//     const disasterItem = await findById(req.params.id);
//     res.json(disasterItem);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// }

// const deleteDisaster = async (req, res) => {
//   try {
//     await findByIdAndDelete(req.params.id);
//     res.json({ message: "Disaster deleted" });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// }

// const updateDisaster = async (req, res) => {
//   try {
//     const disasterItem = await findById(req.params.id);
//     Object.assign(disasterItem, req.body);
//     const updatedDisaster = await disasterItem.save();
//     res.json(updatedDisaster);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// }

// export default { getDisasters, createDisaster, getDisaster, deleteDisaster, updateDisaster };

import Disaster from '../models/disaster.model.js';

const getDisasters = async (req, res) => {
  try {
    const disasters = await Disaster.find();
    res.json(disasters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const createDisaster = async (req, res) => {
  const disasterItem = new Disaster(req.body);

  try {
    const newDisaster = await disasterItem.save();
    res.status(201).json(newDisaster);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getDisaster = async (req, res) => {
  try {
    const disasterItem = await Disaster.findById(req.params.id);
    res.json(disasterItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const deleteDisaster = async (req, res) => {
  try {
    await Disaster.findByIdAndDelete(req.params.id);
    res.json({ message: "Disaster deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const updateDisaster = async (req, res) => {
  try {
    const disasterItem = await Disaster.findById(req.params.id);
    Object.assign(disasterItem, req.body);
    const updatedDisaster = await disasterItem.save();
    res.json(updatedDisaster);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { getDisasters, createDisaster, getDisaster, deleteDisaster, updateDisaster };

