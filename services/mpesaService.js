
const otpStore = {}; }

export async function sendMpesaOtp(phone) {
  // random OTP and requestId
  const otp = ('' + Math.floor(100000 + Math.random() * 900000)).substring(0, 6);
  const requestId = Math.random().toString(36).substring(2, 10);
  otpStore[requestId] = { phone, otp };
  //Daraja API for STK Push or OTP logic.
  console.log(`OTP for ${phone}: ${otp}`); 
  return { requestId };
}

export async function verifyMpesaOtp(phone, otp, requestId) {
  const record = otpStore[requestId];
  if (record && record.phone === phone && record.otp === otp) {
    delete otpStore[requestId];
    return true;
  }
  return false;
}
