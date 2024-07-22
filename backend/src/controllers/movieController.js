// controllers/movieController.js
import pool from '../config/db.js';
import { getMovieSchedulesAndHalls } from '../services/queriesService.js';
import fetch from 'node-fetch';

// Guardar película en la base de datos
export const saveMovie = async (req, res) => {
  const { title, description, duration, classification, genre, imageUrl, releaseDate, originalLanguage } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO Películas (Título, Descripción, Duración, Clasificación, Género, ImagenURL, FechaEstreno, IdiomaOriginal) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [title, description, duration, classification, genre, imageUrl, releaseDate, originalLanguage]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener película por ID
export const getMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Películas WHERE ID_pelicula = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las películas
export const getAllMovies = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Películas');
    console.log(result.rows); // Verifica que `ImagenURL` esté presente
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar película por ID
export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, description, duration, classification, genre, imageUrl, releaseDate, originalLanguage } = req.body;

  try {
    const result = await pool.query(
      `UPDATE Películas SET Título = $1, Descripción = $2, Duración = $3, Clasificación = $4, Género = $5, ImagenURL = $6, FechaEstreno = $7, IdiomaOriginal = $8 
       WHERE ID_pelicula = $9 RETURNING *`,
      [title, description, duration, classification, genre, imageUrl, releaseDate, originalLanguage, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Buscar películas en la API de TMDb
const genreMap = {
  28: 'Acción',
  12: 'Aventura',
  16: 'Animación',
  35: 'Comedia',
  80: 'Crimen',
  99: 'Documental',
  18: 'Drama',
  10751: 'Familia',
  14: 'Fantasía',
  36: 'Historia',
  27: 'Terror',
  10402: 'Música',
  9648: 'Misterio',
  10749: 'Romance',
  878: 'Ciencia Ficción',
  10770: 'Televisión',
  53: 'Suspense',
  10752: 'Guerra',
  37: 'Western',
};

export const searchMovies = async (req, res) => {
  const query = req.params.query;

  try {
    const apiKey = '69ff6f6d2cc8a3915a3d693e3a29b4be';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error en la respuesta de la API');
    }
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const movies = data.results.map(movie => ({
        title: movie.title,
        description: movie.overview,
        duration: movie.runtime !== null ? movie.runtime : 'No disponible',
        classification: movie.adult ? 'Adult' : 'General',
        genre: movie.genre_ids.map(id => genreMap[id] || 'Desconocido').join(', '),
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        releaseDate: movie.release_date,
        originalLanguage: movie.original_language
      }));

      res.json(movies);
    } else {
      res.status(404).json({ message: 'No se encontraron películas.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar películas.' });
  }
};



// Eliminar película por ID
export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM Películas WHERE ID_pelicula = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Película no encontrada' });
    }
    res.json({ message: 'Película eliminada exitosamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener detalles de los horarios y salas de una película
export const getMovieSchedulesAndHallsController = async (req, res) => {
  const { id } = req.params;

  try {
    const schedulesAndHalls = await getMovieSchedulesAndHalls(id);
    res.json(schedulesAndHalls);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
