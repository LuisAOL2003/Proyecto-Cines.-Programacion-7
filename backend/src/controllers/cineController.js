
import pool from '../config/db.js';

// Guardar cine en la base de datos
export const saveCine = async (req, res) => {
  const { nombre, dirección, ciudad, estado, códigoPostal } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO Cines (Nombre, Dirección, Ciudad, Estado, CódigoPostal) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [nombre, dirección, ciudad, estado, códigoPostal]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener cine por ID
export const getCine = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Cines WHERE ID_cine = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar cine por ID
export const updateCine = async (req, res) => {
  const { id } = req.params;
  const { nombre, dirección, ciudad, estado, códigoPostal } = req.body;

  try {
    const result = await pool.query(
      `UPDATE Cines SET Nombre = $1, Dirección = $2, Ciudad = $3, Estado = $4, CódigoPostal = $5 
       WHERE ID_cine = $6 RETURNING *`,
      [nombre, dirección, ciudad, estado, códigoPostal, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar cine por ID
export const deleteCine = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM Cines WHERE ID_cine = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los cines
export const getAllCines = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Cines');
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
