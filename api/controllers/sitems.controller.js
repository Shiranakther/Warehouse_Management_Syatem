// import Sitems from "../models/sitem.moduel.js";
// import { errorHandler } from '../utils/error.js';


//  export const getSitems = async (req, res, next) => {

//     try {
//         const sitems = await Sitems.findById(req.params.id);
//         if(!sitems){
//             return next(errorHandler(404, 'supplier items not found!'));
//         }
//         res.status(200).json(sitems);
//     } catch (error) {
//         next(error);
//     }
//  }
 
supplierItemsController.js
import Sitems from '../models/sitem.moduel.js';

export const getSupplierItems = async (req, res, next) => {
    try {
        const supplierItems = await Sitems.find();
        res.status(200).json(supplierItems);
    } catch (error) {
        next(error);
    }
};
