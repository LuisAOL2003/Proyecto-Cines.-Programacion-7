import express from 'express';
import authRoutes from './authRoutes.js';
import movieRoutes from './movieRoutes.js';
import cineRoutes from './cineRoutes.js';
import hallRoutes from './hallRoutes.js';
import scheduleRoutes from './scheduleRoutes.js';
import seatRoutes from './seatRoutes.js';
import reservationRoutes from './reservationRoutes.js';
import cinemaListingsRoutes from './cinemaListingsRoutes.js';
import ticketRoutes from './ticketRoutes.js';

const router = express.Router();

//Rutas
router.use(authRoutes); //Rutas de usuarios
router.use(movieRoutes); //Rutas de peliculas
router.use(cineRoutes); //Rutas de cines
router.use(hallRoutes); //Rutas de salas
router.use(scheduleRoutes); //Rutas de horarios
router.use(seatRoutes); //Rutas de asientos
router.use(reservationRoutes); //Rutas de reservaciones
router.use(cinemaListingsRoutes); //Rutas de cartelera
router.use(ticketRoutes); //Rutas de boletos


export default router;
