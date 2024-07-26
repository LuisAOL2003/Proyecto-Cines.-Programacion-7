import express from 'express';
import { createSeat, getSeatsByHall, updateSeat, deleteSeat } from '../controllers/seatController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();

// Rutas para los asientos
router.post('/seats', verifyToken, verifyAdmin, createSeat); // Solo administradores pueden crear asientos
router.get('/seats/:id_sala', verifyToken, getSeatsByHall); // Obtener todos los asientos de una sala (protegido)
router.put('/seats/:id', verifyToken, verifyAdmin, updateSeat); // Solo administradores pueden actualizar asientos
router.delete('/seats/:id', verifyToken, verifyAdmin, deleteSeat); // Solo administradores pueden eliminar asientos

export default router;
