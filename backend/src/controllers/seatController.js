import pool from '../config/db.js';

// Crear un nuevo asiento
export const createSeat = async (req, res) => {
  const { id_sala, fila, numero, disponible } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO Asientos (ID_sala, Fila, Numero, Disponible) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_sala, fila, numero, disponible]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los asientos de una sala
export const getSeatsByHallAndMovie = async (req, res) => {
  const { id_sala, id_pelicula } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Asientos WHERE ID_sala = $1 and ID_pelicula = $2', [id_sala, id_pelicula]);
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un asiento
export const updateSeat = async (req, res) => {
  const { id } = req.params;
  const { fila, numero, disponible } = req.body;

  try {
    const result = await pool.query(
      'UPDATE Asientos SET Fila = $1, Numero = $2, Disponible = $3 WHERE ID_asiento = $4 RETURNING *',
      [fila, numero, disponible, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asiento no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un asiento
export const deleteSeat = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM Asientos WHERE ID_asiento = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Asiento no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los asientos de una sala con disponibilidad
export const getSeatsByHallAndSchedule = async (req, res) => {
  const { id_sala, id_horario } = req.params;

  try {
    // Obtener asientos de la sala
    const seatsResult = await pool.query('SELECT * FROM Asientos WHERE ID_sala = $1', [id_sala]);

    // Obtener asientos reservados para el horario específico
    const reservedSeatsResult = await pool.query('SELECT ID_asiento FROM Reservas WHERE ID_horario = $1', [id_horario]);
    const reservedSeats = reservedSeatsResult.rows.map(row => row.id_asiento);

    // Marcar los asientos como ocupados si están reservados
    const seats = seatsResult.rows.map(seat => ({
      ...seat,
      disponible: !reservedSeats.includes(seat.id_asiento)
    }));

    res.json(seats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
