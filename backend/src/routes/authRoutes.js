import express from 'express';
import verifyToken from '../middlewares/verifyToken.js';
import { registerUser, loginUser, refreshToken, logoutUser   } from '../controllers/authController.js';

const router = express.Router();

// Rutas de registro de usuarios y autenticación 
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);
router.post('/refresh-token', refreshToken);
router.post('/logout', logoutUser);

// Ruta protegida de ejemplo
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acceso autorizado a ruta protegida', user: req.userId });
});

export default router;
