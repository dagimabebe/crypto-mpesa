import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  password: String, 
  ethAddress: { type: String, unique: true, sparse: true },
  mpesaPhone: { type: String, unique: true, sparse: true },
  registeredVia: { type: String, enum: ['email', 'eth', 'mpesa'] },
});

export default mongoose.model('User', userSchema);
