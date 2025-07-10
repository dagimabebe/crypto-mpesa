import express from 'express';
import {
  registerWithEmail,
  loginWithEmail,
  authWithEthereum,
  authWithMpesa
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerWithEmail);
router.post('/login', loginWithEmail);
router.post('/eth', authWithEthereum);
router.post('/mpesa', authWithMpesa);

export default router;
