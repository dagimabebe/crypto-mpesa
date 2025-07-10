import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import { verifyEthSignature } from '../services/ethService.js';
import { sendMpesaOtp, verifyMpesaOtp } from '../services/mpesaService.js';

// Email stufffffssssssss
export async function registerWithEmail(req, res) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });
  const hash = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ email, password: hash, registeredVia: 'email' });
    res.json({ token: generateToken({ id: user._id, email: user.email }) });
  } catch (e) {
    res.status(400).json({ error: 'Email already registered' });
  }
}


export async function loginWithEmail(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ token: generateToken({ id: user._id, email: user.email }) });
}

// Ethereum wallet authentication
export async function authWithEthereum(req, res) {
  const { ethAddress, signature, message } = req.body;
  if (!ethAddress || !signature || !message)
    return res.status(400).json({ error: 'Missing parameters' });
  if (!verifyEthSignature(ethAddress, signature, message))
    return res.status(401).json({ error: 'Invalid signature' });
  let user = await User.findOne({ ethAddress });
  if (!user) user = await User.create({ ethAddress, registeredVia: 'eth' });
  res.json({ token: generateToken({ id: user._id, ethAddress: user.ethAddress }) });
}

// M-Pesa OTP authentication (2-step)
export async function authWithMpesa(req, res) {
  const { phone, otp, requestId } = req.body;
  if (!phone) return res.status(400).json({ error: 'Phone required' });

  if (!otp) {
    // Step 1: Send OTP
    const { requestId } = await sendMpesaOtp(phone);
    return res.json({ requestId, message: 'OTP sent to phone' });
  } else {
    // Step 2: Verify OTP
    const valid = await verifyMpesaOtp(phone, otp, requestId);
    if (!valid) return res.status(401).json({ error: 'Invalid OTP' });
    let user = await User.findOne({ mpesaPhone: phone });
    if (!user) user = await User.create({ mpesaPhone: phone, registeredVia: 'mpesa' });
    res.json({ token: generateToken({ id: user._id, mpesaPhone: user.mpesaPhone }) });
  }
}
