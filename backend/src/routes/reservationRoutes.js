import express from 'express';
import { createReservation, getReservationsByUser, getReservationsByProjection, deleteReservation } from '../controllers/reservationController.js';
import verifyToken from '../middlewares/verifyToken.js';

const router = express.Router();

// Rutas para las reservas
router.post('/reservations', verifyToken, createReservation); // Crear una nueva reserva
router.get('/reservations/user/:id_usuario', verifyToken, getReservationsByUser); // Obtener reservas por usuario
router.get('/reservations/projection/:id_proyeccion', verifyToken, getReservationsByProjection); // Obtener reservas por proyección
router.delete('/reservations/:id', verifyToken, deleteReservation); // Eliminar una reserva

export default router;
