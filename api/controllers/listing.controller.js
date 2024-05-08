import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createPO = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deletePO = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Purchase Order not found!'));
  }


  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Purchase order has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updatePO = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Purchse Order not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, ''));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getPO = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Purchase Order not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getPOs = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
  

    

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
