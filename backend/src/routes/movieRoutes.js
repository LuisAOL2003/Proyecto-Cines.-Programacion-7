import express from 'express';
import { saveMovie, getMovie, updateMovie, deleteMovie, getAllMovies, searchMovies, getMovieSchedulesAndHallsController } from '../controllers/movieController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();

// Rutas para las películas
router.post('/movies', saveMovie); //guardar pelicula
router.put('/movies/:id', verifyToken, verifyAdmin, updateMovie); //actualizar pelicula
router.delete('/movies/:id', verifyToken, verifyAdmin, deleteMovie); //eliminar pelicula
router.get('/movies/:id', getMovie); //obtener pelicula por id
router.get('/movies', getAllMovies); //obtener todas las peliculas
router.get('/movies/search/:query', searchMovies); // Ruta de búsqueda de peliculas en la api
router.get('/movies/:id/schedules', verifyToken, getMovieSchedulesAndHallsController); //obtener peliculas de una sala

export default router;

