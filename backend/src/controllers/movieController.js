// controllers/movieController.js
import pool from '../config/db.js';
import { getMovieSchedulesAndHalls } from '../services/queriesService.js';
import axios from 'axios';


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

//hola

// Obtener todas las películas
export const getAllMovies = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Películas');
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
export const searchMovies = async (req, res) => {
  const { query } = req.params;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: query
      }
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

//Joins

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

