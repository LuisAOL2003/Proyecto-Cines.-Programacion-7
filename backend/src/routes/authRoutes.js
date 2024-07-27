import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import { registerUser, loginUser, refreshToken, logoutUser   } from '../controllers/authController.js';

const router = express.Router();

// Rutas de registro de usuarios y autenticación 
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/refresh-token', verifyToken, refreshToken);
router.post('/auth/logout', logoutUser);


export default router;
