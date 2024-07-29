import express from 'express';
import { createSeat, getSeatsByHall, updateSeat, deleteSeat, getSeatsByHallAndSchedule } from '../controllers/seatController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();

// Rutas para los asientos
router.post('/seats',  createSeat); // Solo administradores pueden crear asientos
router.get('/seats/:id_sala', getSeatsByHall); // Obtener todos los asientos de una sala 
router.put('/seats/:id', updateSeat); // Solo administradores pueden actualizar asientos
router.delete('/seats/:id',  deleteSeat); // Solo administradores pueden eliminar asientos
router.get('/seats/:id_sala/:id_horario',  getSeatsByHallAndSchedule); // Obtener asientos disponibles y ocupados por sala y horario

export default router;


