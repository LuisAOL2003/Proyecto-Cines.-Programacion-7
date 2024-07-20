import express from 'express';
import { saveMovie, getMovie, updateMovie, deleteMovie, getAllMovies, searchMovies, getMovieSchedulesAndHallsController } from '../controllers/movieController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();

// Rutas para las películas
router.post('/movies', saveMovie);
router.put('/movies/:id', verifyToken, verifyAdmin, updateMovie);
router.delete('/movies/:id', verifyToken, verifyAdmin, deleteMovie);
router.get('/movies/:id', verifyToken, getMovie);
router.get('/movies', verifyToken, getAllMovies);
router.get('/movies/search/:query', searchMovies); // Ruta de búsqueda
router.get('/movies/:id/schedules', verifyToken, getMovieSchedulesAndHallsController);

export default router;

