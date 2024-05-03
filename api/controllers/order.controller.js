// const Order = require("../models/order.model");

// const getOrders = async (req, res) => {
//     try {
//         // Grouping orders by OrderID
//         const groupedOrders = await Order.aggregate([
//             { $group: { _id: "$OrderID", orders: { $push: "$$ROOT" } } }
//         ]);

//         res.json(groupedOrders);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// const createOrder = async (req, res) => {
//     const order = new Order({
//         Outlet: req.body.Outlet,
//         OrderID: req.body.OrderID,
//         ItemCode: req.body.ItemCode,
//         Quantity: req.body.Quantity,
    
//     });

//     try {
//         const newOrder = await order.save();
//         res.status(201).json(newOrder);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

// const getOrder = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);
//         res.json(order);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// const deleteOrder = async (req, res) => {
//     try {
//         await Order.findByIdAndDelete(req.params.id);
//         res.json({ message: "Order deleted" });
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

// const updateOrder = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.id);
//         if (req.body.Outlet) {
//             order.Outlet = req.body.Outlet;
//         }
//         if (req.body.OrderID) {
//             order.OrderID = req.body.OrderID;
//         }
//         if (req.body.ItemCode) {
//             order.ItemCode = req.body.ItemCode;
//         }
//         if (req.body.Quantity) {
//             order.Quantity = req.body.Quantity;
//         }
//         const updatedOrder = await order.save();
//         res.json(updatedOrder);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

// module.exports = { getOrders, createOrder, getOrder, deleteOrder, updateOrder };
import Order from "../models/order.model.js";

export const getOrders = async (req, res) => {
    try {
        // Grouping orders by OrderID
        const groupedOrders = await Order.aggregate([
            { $group: { _id: "$OrderID", orders: { $push: "$$ROOT" } } }
        ]);

        res.json(groupedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createOrder = async (req, res) => {
    const order = new Order({
        Outlet: req.body.Outlet,
        OrderID: req.body.OrderID,
        ItemCode: req.body.ItemCode,
        Quantity: req.body.Quantity,
    
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.json(order);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.json({ message: "Order deleted" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (req.body.Outlet) {
            order.Outlet = req.body.Outlet;
        }
        if (req.body.OrderID) {
            order.OrderID = req.body.OrderID;
        }
        if (req.body.ItemCode) {
            order.ItemCode = req.body.ItemCode;
        }
        if (req.body.Quantity) {
            order.Quantity = req.body.Quantity;
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
