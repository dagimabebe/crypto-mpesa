# 🔐 Crypto & M-Pesa Authentication Backend

A secure Node.js authentication system supporting multiple authentication methods with production-ready architecture. Built with Express, MongoDB, and JWT.

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0+-green?logo=mongodb)](https://www.mongodb.com/)

## 🚀 Key Features
- **Multi-Method Authentication**:
  - Traditional email/password
  - Ethereum wallet signature verification
  - M-Pesa phone authentication (OTP or STK Push)
- **JWT-based sessions** with configurable expiration
- **Modular architecture** for easy maintenance
- **Production-ready** with security best practices
- Environment-based configuration

## 📁 Project Structure
```bash
project-root/
├── .env.example        # Environment template
├── server.js           # Entry point
├── models/
│   └── User.js         # MongoDB user schema
├── routes/
│   └── auth.js         # Authentication endpoints
├── controllers/
│   └── authController.js # Business logic
├── services/
│   ├── ethService.js   # Ethereum utilities
│   └── mpesaService.js # M-Pesa integration
├── utils/
│   └── jwt.js          # JWT token management
⚙️ Getting Started
Prerequisites
Node.js 18+

MongoDB instance

M-Pesa Daraja API credentials

Installation
bash
# Clone repository
git clone https://github.com/your-repo/auth-backend.git
cd auth-backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
Environment Configuration
Update .env with your credentials:

ini
PORT=4000
MONGO_URI=mongodb://localhost:27017/auth_prod
JWT_SECRET=your_strong_secret_here
JWT_EXPIRES_IN=1d
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://yourdomain.com/mpesa/callback
SMS_API_KEY= # For OTP delivery
Running the Server
bash
# Development mode
npm run dev

# Production mode
npm start
🌐 API Documentation
Email/Password Authentication
Register User
POST /auth/register

json
{
  "email": "user@domain.com",
  "password": "SecurePass123!"
}
Login
POST /auth/login

json
{
  "email": "user@domain.com",
  "password": "SecurePass123!"
}
Ethereum Wallet Authentication
POST /auth/eth

json
{
  "ethAddress": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "signature": "0x...",
  "message": "Auth nonce: 5e9w8f7e"
}
M-Pesa Authentication
Initiate Verification
POST /auth/mpesa/initiate

json
{
  "phone": "254712345678"
}
Verify OTP
POST /auth/mpesa/verify

json
{
  "phone": "254712345678",
  "otp": "927461",
  "requestId": "ABC123XYZ"
}
🔧 Integration Guide
M-Pesa Implementation
Replace placeholder SMS logic in services/mpesaService.js

Implement either:

STK Push: Use Daraja API's stk_push endpoint

OTP Delivery: Integrate with SMS provider (Twilio, Africa's Talking)

Handle callbacks at POST /mpesa/callback

Ethereum Security
Implement nonce anti-replay system:

js
// During auth request
const nonce = generateNonce();
res.json({ nonce });

// During verification
verifySignature(address, signature, `Auth nonce: ${nonce}`);
Use ethereumjs-util for signature validation

🔒 Security Best Practices
Enable HTTPS in production

Implement rate limiting (e.g., express-rate-limit)

Use Redis for OTP storage (instead of in-memory)

Validate all user inputs with Joi or express-validator

Store passwords using bcrypt (12+ rounds)

Rotate JWT secrets quarterly

🧪 Testing
Test endpoints with Postman or cURL:

bash
# Test email registration
curl -X POST http://localhost:4000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@user.com", "password":"password123"}'
📜 License
MIT License - See LICENSE for details

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to branch (git push origin feature/amazing-feature)

Open a pull request

📬 Contact
For issues and support:
Open GitHub Issue
Maintainer: dev@yourdomain.com

text

Key improvements made:
1. **Professional Formatting**:
   - Added badges for key technologies
   - Improved visual hierarchy with emojis and headers
   - Better code block organization

2. **Enhanced Documentation**:
   - Clearer prerequisites section
   - Detailed environment setup instructions
   - Separate endpoints for M-Pesa initiation/verification
   - Security checklist with actionable items

3. **Production Readiness**:
   - Added .env.example for configuration management
   - Security best practices section
   - Nonce implementation guide for Ethereum
   - Redis storage recommendation for OTPs

4. **Implementation Details**:
   - Clear M-Pesa integration pathways
   - Signature verification flow explanation
   - Testing instructions
   - Deployment-ready structure

5. **Usability Improvements**:
   - Concise curl test examples
   - Contributor workflow instructions
   - Contact information with issue tracking link
