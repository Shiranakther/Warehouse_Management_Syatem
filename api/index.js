// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRouter from './routes/user.route.js';
// import authRouter from './routes/auth.route.js';
// import listingRouter from './routes/listing.route.js';
// import lowinventoryRouter from './routes/lowinventory.route.js';
// import itemRoutes from "./routes/Item.route.js"
// import cookieParser from 'cookie-parser';
// import path from 'path';
// const cors = require('cors');
// import orderRoute from './routes/order.Route.js';
// app.use(cors());
// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log('Connected to MongoDB!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//   const __dirname = path.resolve();

// const app = express();

// app.use(express.json());

// app.use(cookieParser());

// app.listen(3000, () => {
//   console.log('Server is running on port 3000!');
// });

// app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/listing', listingRouter);
// app.use('/api/lowinventory', lowinventoryRouter);
// app.use("/api/Item", itemRoutes);
// app.use('/api/order', orderRoute);
// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// })

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });














//Shirannnnnnnnnnnnnnnnnnnnnnnnnnnnnnn

// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRouter from './routes/user.route.js';
// import authRouter from './routes/auth.route.js';
// import listingRouter from './routes/listing.route.js';
// import lowinventoryRouter from './routes/lowinventory.route.js';
// import itemRoutes from "./routes/Item.route.js";
// import orderRoute from './routes/order.Route.js'; // Assuming this file exists
// import cookieParser from 'cookie-parser';
// import path from 'path';
// import cors from 'cors';
// import { dbConfig } from './utils/dbconfig.js';
// import morgan from 'morgan'
// import vehicleRouter from './routes/vehicleRoutes.js';
// import shippingRouter from './routes/shippingRoutes.js';
// import returnRoute from './routes/returnRoute.js';
// import wasteRoute from './routes/wasteRoute.js';
// import lostItemRoutes from './routes/lostItem.route.js'; 
// import Maintanceroute from './routes/maintance.route.js';

// dotenv.config();

// const app = express();
// const __dirname = path.resolve();

// app.use(express.json());
// app.use(morgan('dev'))

// app.use(cookieParser());
// app.use(cors()); // Move cors middleware here

// mongoose
//   .connect(process.env.MONGO)
//   .then(() => {
//     console.log('Connected to MongoDB!');
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000!');
// });

// app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/listing', listingRouter);
// app.use('/api/lowinventory', lowinventoryRouter);
// app.use("/api/Item", itemRoutes);
// app.use('/api/order', orderRoute);
// app.use(express.static(path.join(__dirname, '/client/dist')));
// app.use('/vehicle', vehicleRouter )
// app.use('/shipping', shippingRouter )
// app.use('/api/returns', returnRoute);
// app.use('/api/wastes', wasteRoute);

// app.use("/api/maintance", Maintanceroute);
// app.use("/api/lostItem", lostItemRoutes);

// dbConfig();

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });




//navodya
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import lowinventoryRouter from './routes/lowinventory.route.js';
import itemRoutes from "./routes/Item.route.js";
import orderRoute from './routes/order.Route.js'; // Assuming this file exists
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import vehicleRouter from './routes/vehicleRoutes.js';
import shippingRouter from './routes/shippingRoutes.js';
import returnRoute from './routes/returnRoute.js';
import wasteRoute from './routes/wasteRoute.js';
import lostItemRoutes from './routes/lostItem.route.js'; 
import Maintanceroute from './routes/maintance.route.js';

//staff & shifts
import staffRoutes from './routes/staff.route.js';
import shiftRoutes from './routes/shift.route.js';
import workersShiftScheduleRoutes from './routes/workersShiftSchedule.route.js';
import SuppliersRouter from './routes/supplier.route.js';



// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const __dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB!');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);
app.use('/api/lowinventory', lowinventoryRouter);
app.use("/api/Item", itemRoutes);
app.use('/api/order', orderRoute);
app.use('/api/returns', returnRoute);
app.use('/api/wastes', wasteRoute);
app.use("/api/maintance", Maintanceroute);
app.use("/api/lostItem", lostItemRoutes);

//staff & Shift routes
app.use("/api/staff", staffRoutes);
app.use("/api/shift", shiftRoutes);
app.use("/api/workersShiftSchedule", workersShiftScheduleRoutes);

//vehicle & Shift shipping
app.use('/api/vehicleRoutes', vehicleRouter);
app.use('/api/shippingRoutes', shippingRouter);

app.use('/api/supplier', SuppliersRouter);



// Serve static files
app.use(express.static(path.join(__dirname, '/client/dist')));

// Catch-all route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
