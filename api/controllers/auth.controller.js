import User from '../models/user.model.js';
import Staff from "../models/staff.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) return next(errorHandler(404, 'User not found!'));
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//     const { password: pass, ...rest } = validUser._doc;
//     res
//       .cookie('access_token', token, { httpOnly: true })
//       .status(200)
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };


export const signin = async (req, res, next) => {
  const { userType, email, password } = req.body;

  try {
    let validUser;

    // Check userType and query the corresponding collection
    if (userType === 'staff') {
      validUser = await Staff.findOne({ email });
    } else {
      validUser = await User.findOne({ email });
    }

    if (!validUser) {
      // If user not found, return an error
      return next(errorHandler(404, 'User not found'));
    }

    // Check password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      // If password is incorrect, return an error
      return next(errorHandler(401, 'Wrong credentials'));
    }

    // Generate token based on userType
    const role = userType === 'staff' ? 'staff' : 'user';
    const token = jwt.sign({ id: validUser._id, role }, process.env.JWT_SECRET);

    // Omit sensitive fields from response
    const { password: hashedPassword, ...rest } = validUser._doc;

    // Set appropriate cookie options
    const cookieOptions = { httpOnly: true };

    // Set cookie and send response
    res.cookie('access_token', token, cookieOptions).status(200).json({ ...rest, isStaff: role === 'staff' });
  } catch (error) {
    next(error);
  }
};





export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};

// Staff
export const register = async(req,res,next)=>{
  const {username,id,type,number,email,address,joindate,shift,license,password} = req.body;

  // Create an object to hold only the required fields
  const staffData = {
      username,
      id,
      type,
      number,
      email,
      address,
      joindate,
      
  };

  
  if(license){staffData.license = license}

  // Handle null values for password
  if (password !== null && password !== undefined) {
      staffData.password = bcryptjs.hashSync(password, 10);
  }

  try {
      // Create a new staff instance with the staffData object
      const newStaff = new Staff(staffData);
      await newStaff.save();
      res.status(201).json({message:"Staff member created successfully"});
  } catch (error) {
      next(error);
  }
};


export const login = async(req,res,next)=>{
  const {email,password} = req.body;

  try {
      const validUser = await Staff.findOne({email});
      if (!validUser) return next(errorHandler(404, 'User not found'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong username or password'));
      const token = Jwt.sign({id : validUser._id}, process.env.Jwt_SECRET);
      const {password: hashedPassword, ...rest}= validUser._doc;
      const expiryDate = new Date(Date.now()+3600000);
      res.cookie('access_token', token, {httpOnly:true,expires:expiryDate}).status(200).json(rest);
  } catch (error) {
     next(error) ;
  }
};

