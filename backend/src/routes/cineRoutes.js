import express from 'express';
import { saveCine, getCine, updateCine, deleteCine, getAllCines } from '../controllers/cineController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();

// Rutas para los cines
router.post('/cines', verifyToken, verifyAdmin, saveCine); // Crear cine (solo admin)
router.get('/cines/:id', verifyToken, getCine); // Obtener cine por ID 
router.put('/cines/:id', verifyToken, verifyAdmin, updateCine); // Actualizar cine por ID (solo admin)
router.delete('/cines/:id', verifyToken, verifyAdmin, deleteCine); // Eliminar cine por ID (solo admin)
router.get('/cines', verifyToken, getAllCines); // Obtener todos los cines

export default router;
