// import mongoose from 'mongoose';

// let Return;

// try {
//   // Try to fetch the model if it already exists
//   Return = mongoose.model('Return');
// } catch {
//   // If the model doesn't exist, define it
//   const returnSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     telephoneno: { type: Number, required: true },
//     whatapp: { type: String, required: true },
//     email: { type: String, required: true },
//     reason: { type: String, required: true },
   
//   }, {
//     timestamps: true,
//   });

//   Return = mongoose.model('Disaster', returnSchema);
// }

// export default Disaster;
// const mongoose = require('mongoose');

// const disasterSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   telephoneNo: { type: String, required: true },
//   whatsapp: { type: String, required: true },
//   gmail: { type: String, required: true },
//   reason: { type: String, required: true },
// }, {
//   timestamps: true,
// });

// const Disaster = mongoose.model('Disaster', disasterSchema);

// module.exports = Disaster;

import mongoose from 'mongoose';

const disasterSchema = new mongoose.Schema({
  name: { type: String,  },
  telephoneNo: { type: String,  },
  whatsapp: { type: String, },
  gmail: { type: String,  },
  reason: { type: String,  },
}, {
  timestamps: true,
});

const Disaster = mongoose.model('Disaster', disasterSchema);

export default Disaster;

