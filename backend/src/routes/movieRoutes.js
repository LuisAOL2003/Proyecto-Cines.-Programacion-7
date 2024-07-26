import express from 'express';
import { saveMovie, getMovie, updateMovie, deleteMovie, getAllMovies, searchMovies, getMovieSchedulesAndHallsController } from '../controllers/movieController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();

// Rutas para las películas
router.post('/movies', verifyToken, verifyAdmin, saveMovie); // Solo administradores pueden guardar películas
router.put('/movies/:id', verifyToken, verifyAdmin, updateMovie); // Solo administradores pueden actualizar películas
router.delete('/movies/:id', verifyToken, verifyAdmin, deleteMovie); // Solo administradores pueden eliminar películas
router.get('/movies/:id', verifyToken, getMovie); // Obtener una película por ID 
router.get('/movies', verifyToken, getAllMovies); // Obtener todas las películas (accesible para todos)
router.get('/movies/search/:query', verifyToken, verifyAdmin, searchMovies); // Buscar películas en la API de TMDb (protegido)
router.get('/movies/:id/schedules', verifyToken, getMovieSchedulesAndHallsController); // Obtener horarios y salas de una película

export default router;
