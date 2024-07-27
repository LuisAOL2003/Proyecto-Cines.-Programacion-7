import express from 'express';
import { createReservation, getReservationsByUser, getReservationsByProjection, deleteReservation } from '../controllers/reservationController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// Rutas para las reservas
router.post('/reservations',  createReservation); // Usuarios autenticados pueden crear reservas
router.get('/reservations/user/:id_usuario',  getReservationsByUser); // Obtener reservas por usuario 
router.get('/reservations/projection/:id_pelicula',  getReservationsByProjection); // Obtener reservas por proyección 
router.delete('/reservations/:id',  deleteReservation); // Usuarios autenticados pueden eliminar sus reservas

export default router;

