import express from 'express';
import { createCartelera, getCarteleraById, updateCartelera, deleteCartelera, getAllCartelera, getCarteleraByType } from '../controllers/cinema_listingsController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();

// Rutas para la cartelera
router.post('/cartelera', verifyToken, verifyAdmin, createCartelera); // Solo administradores pueden crear cartelera
router.get('/cartelera/:id', verifyToken, getCarteleraById); // Obtener una cartelera por ID (protegido)
router.put('/cartelera/:id', verifyToken, verifyAdmin, updateCartelera); // Solo administradores pueden actualizar cartelera
router.delete('/cartelera/:id', verifyToken, verifyAdmin, deleteCartelera); // Solo administradores pueden eliminar cartelera
router.get('/cartelera', getAllCartelera); // Obtener todas las carteleras (accesible para todos)
router.get('/cartelera/type/:type', getCarteleraByType); // Obtener cartelera por tipo (accesible para todos)

export default router;
