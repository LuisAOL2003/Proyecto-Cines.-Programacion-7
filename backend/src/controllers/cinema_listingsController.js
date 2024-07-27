
import pool from '../config/db.js';

// Crear una nueva entrada en la cartelera
export const createCartelera = async (req, res) => {
  const { ID_Película, FechaInicio, FechaFin, Tipo } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO Cartelera (ID_Película, FechaInicio, FechaFin, Tipo) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [ID_Película, FechaInicio, FechaFin, Tipo]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener una entrada de la cartelera por ID
export const getCarteleraById = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT c.ID_cartelera, p.*
      FROM Cartelera c
      JOIN Películas p ON c.ID_Película = p.ID_pelicula
      WHERE c.ID_cartelera = $1
    `;
    const result = await pool.query(query, [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una entrada de la cartelera por ID
export const updateCartelera = async (req, res) => {
  const { id } = req.params;
  const { ID_Película, FechaInicio, FechaFin, Tipo } = req.body;

  try {
    const result = await pool.query(
      `UPDATE Cartelera SET ID_Película = $1, FechaInicio = $2, FechaFin = $3, Tipo = $4 
       WHERE ID_cartelera = $5 RETURNING *`,
      [ID_Película, FechaInicio, FechaFin, Tipo, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una entrada de la cartelera por ID
export const deleteCartelera = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM Cartelera WHERE ID_cartelera = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las entradas de la cartelera
export const getAllCartelera = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Cartelera');
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener entradas de la cartelera por tipo (cartelera o próximo estreno)
export const getCarteleraByType = async (req, res) => {
  const { type } = req.params;

  try {
    const query = `
      SELECT p.ID_pelicula, c.ID_cartelera, p.Título, p.ImagenURL, p.Descripción, p.Duración, p.Clasificación, p.Género, p.FechaEstreno, p.IdiomaOriginal
      FROM Cartelera c
      JOIN Películas p ON c.ID_Película = p.ID_pelicula
      WHERE c.Tipo = $1
    `;
    const result = await pool.query(query, [type]);
    res.json(result.rows); 
  } catch (error) {
    console.error('Error al obtener la cartelera:', error);
    res.status(500).json({ error: 'Error interno del servidor' }); 
  }
};


