import express from 'express';
import { createHall, getAllHalls, getHallById, updateHall, deleteHall } from '../controllers/hallController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();

// Rutas para las salas
router.post('/halls', verifyToken, verifyAdmin, createHall); // Solo administradores pueden crear salas
router.get('/halls', verifyToken, getAllHalls); // Obtener todas las salas (accesible para todos)
router.get('/halls/:id', verifyToken, getHallById); // Obtener una sala por ID 
router.put('/halls/:id', verifyToken, verifyAdmin, updateHall); // Solo administradores pueden actualizar salas
router.delete('/halls/:id', verifyToken, verifyAdmin, deleteHall); // Solo administradores pueden eliminar salas

export default router;
