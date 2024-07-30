import pool from '../config/db.js';

// Crear una nueva reserva
export const createReservation = async (req, res) => {
  const { id_usuario, id_asiento, id_horario } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Reservas (ID_usuario, ID_asiento, ID_horario) VALUES ($1, $2, $3) RETURNING *',
      [id_usuario, id_asiento, id_horario]
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

// Obtener reservas por horario
export const getReservationsBySchedule = async (req, res) => {
  try {
    const { id_horario } = req.params;
    const result = await pool.query('SELECT * FROM Reservas WHERE ID_horario = $1', [id_horario]);
    res.json(result.rows);
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