import pool from '../config/db.js';

// Crear una nueva reserva
export const createReservation = async (req, res) => {
  const { id_usuario, id_asiento, id_pelicula } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Reservas (ID_usuario, ID_asiento, ID_pelicula) VALUES ($1, $2, $3) RETURNING *',
      [id_usuario, id_asiento, id_pelicula]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener reservas por usuario
export const getReservationsByUser = async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Reservas WHERE ID_usuario = $1', [id_usuario]);
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getReservationsByProjection = async (req, res) => {
  try {
    const { id_pelicula } = req.params;
    // Realiza la consulta a la base de datos para obtener las reservas
    const reservations = await db.query('SELECT * FROM reservas WHERE ID_pelicula = $1', [id_pelicula]);
    res.json(reservations.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una reserva
export const deleteReservation = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM Reservas WHERE ID_reserva = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
