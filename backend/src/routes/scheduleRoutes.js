import express from 'express';
import { createSchedule, getAllSchedules, getScheduleById, updateSchedule, deleteSchedule, getSeatsForSchedule, getSchedulesByMovieId } from '../controllers/scheduleController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();

// Rutas para los horarios
router.post('/schedules',  createSchedule); // Solo administradores pueden crear horarios
router.get('/schedules',  getAllSchedules); // Obtener todos los horarios 
router.get('/schedules/:id', getScheduleById); // obtener un horario por ID
router.put('/schedules/:id', verifyToken, verifyAdmin, updateSchedule); // Solo administradores pueden actualizar horarios
router.delete('/schedules/:id', verifyToken, verifyAdmin, deleteSchedule); // Solo administradores pueden eliminar horarios
router.get('/schedules/movie/:id', getSchedulesByMovieId); //obtener todos los horarios de una pelicula
router.get('/api/seats/:id_horario', getSeatsForSchedule);


export default router;
