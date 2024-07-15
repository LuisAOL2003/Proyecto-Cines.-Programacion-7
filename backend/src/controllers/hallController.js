import pool from '../config/db.js';

// Crear una nueva sala
export const createHall = async (req, res) => {
  const { nombre, capacidad, id_cine } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Salas (Nombre, Capacidad, ID_cine) VALUES ($1, $2, $3) RETURNING *',
      [nombre, capacidad, id_cine]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las salas
export const getAllHalls = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Salas');
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener una sala por ID
export const getHallById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Salas WHERE ID_sala = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sala no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una sala
export const updateHall = async (req, res) => {
  const { id } = req.params;
  const { nombre, capacidad, id_cine } = req.body;

  try {
    const result = await pool.query(
      'UPDATE Salas SET Nombre = $1, Capacidad = $2, ID_cine = $3 WHERE ID_sala = $4 RETURNING *',
      [nombre, capacidad, id_cine, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sala no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar una sala
export const deleteHall = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM Salas WHERE ID_sala = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Sala no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
