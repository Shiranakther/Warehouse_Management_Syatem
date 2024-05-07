import mongoose from 'mongoose';

let Return;

try {
  // Try to fetch the model if it already exists
  Return = mongoose.model('Return');
} catch {
  // If the model doesn't exist, define it
  const returnSchema = new mongoose.Schema({
    name: { type: String, required: true },
    telephoneno: { type: Number, required: true },
    whatapp: { type: String, required: true },
    email: { type: String, required: true },
    reason: { type: String, required: true },
   
  }, {
    timestamps: true,
  });

  Return = mongoose.model('Disaster', returnSchema);
}

export default Disaster;
