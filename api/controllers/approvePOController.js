// import ApprovePO from '../models/approvePO.model.js';

// // Controller function to handle the approval of a purchase order
// const approvePO = async (req, res) => {
//   try {
//     // Extract data from the request body
//     const { supplierName, itemName, itemCode, orderQuantity } = req.body;

//     // Create a new instance of ApprovePO model
//     const newApprovePO = new ApprovePO({
//       supplierName,
//       itemName,
//       itemCode,
//       orderQuantity,
//     });

//     // Save the new approval to the database
//     const savedApprovePO = await newApprovePO.save();

//     // Send a success response with the saved data
//     res.status(201).json(savedApprovePO);
//   } catch (error) {
//     // If an error occurs, send a 500 (Internal Server Error) response with the error message
//     res.status(500).json({ message: error.message });
//   }
// };

// export default { approvePO };
// controllers/approvePOController.js

import ApprovePO from '../models/approvePO.model.js';

const approvePO = async (req, res) => {
  try {
    // Extract data from the request body
    const { supplierName, itemName, itemCode, orderQuentity } = req.body;

    // Create a new instance of ApprovePO model
    const newApprovePO = new ApprovePO({
      supplierName,
      itemName,
      itemCode,
      orderQuentity,
    });

    // Save the new approval to the database
    const savedApprovePO = await newApprovePO.save();

    // Send a success response with the saved data
    res.status(201).json(savedApprovePO);
  } catch (error) {
    // If an error occurs, send a 500 (Internal Server Error) response with the error message
    res.status(500).json({ message: error.message });
    
  }
};

export default { approvePO };
