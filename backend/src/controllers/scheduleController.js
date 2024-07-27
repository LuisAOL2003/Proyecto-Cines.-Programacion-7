import pool from '../config/db.js';

// Crear un nuevo horario
export const createSchedule = async (req, res) => {
  const { id_pelicula, id_sala, fecha, horaInicio, horaFin } = req.body;

  try {
    // Verificar si hay una coincidencia con otros horarios en la misma sala
    const conflict = await pool.query(
      `SELECT * FROM Horarios 
       WHERE ID_sala = $1 AND Fecha = $2 AND 
       ((HoraInicio < $3 AND HoraFin > $3) OR (HoraInicio < $4 AND HoraFin > $4))`,
      [id_sala, fecha, horaFin, horaInicio]
    );

    if (conflict.rows.length > 0) {
      return res.status(400).json({ error: 'El horario coincide con otro existente en la misma sala.' });
    }

    const result = await pool.query(
      'INSERT INTO Horarios (ID_pelicula, ID_sala, Fecha, HoraInicio, HoraFin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id_pelicula, id_sala, fecha, horaInicio, horaFin]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los horarios
export const getAllSchedules = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Horarios');
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un horario por ID
export const getScheduleById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Horarios WHERE ID_horario = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener los horarios de una película por ID de película
export const getSchedulesByMovieId = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
      SELECT h.ID_horario, h.Fecha, h.HoraInicio, h.HoraFin, s.Nombre AS nombre_sala
      FROM Horarios h
      JOIN Salas s ON h.ID_Sala = s.ID_sala
      WHERE h.ID_Pelicula = $1
    `;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron horarios para esta película' });
    }
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Actualizar un horario
export const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { id_pelicula, id_sala, fecha, horaInicio, horaFin } = req.body;

  try {
    // Verificar si hay una coincidencia con otros horarios en la misma sala
    const conflict = await pool.query(
      `SELECT * FROM Horarios 
       WHERE ID_sala = $1 AND Fecha = $2 AND 
       ((HoraInicio < $3 AND HoraFin > $3) OR (HoraInicio < $4 AND HoraFin > $4)) AND ID_horario != $5`,
      [id_sala, fecha, horaFin, horaInicio, id]
    );

    if (conflict.rows.length > 0) {
      return res.status(400).json({ error: 'El horario coincide con otro existente en la misma sala.' });
    }

    const result = await pool.query(
      `UPDATE Horarios SET ID_pelicula = $1, ID_sala = $2, Fecha = $3, HoraInicio = $4, HoraFin = $5 
       WHERE ID_horario = $6 RETURNING *`,
      [id_pelicula, id_sala, fecha, horaInicio, horaFin, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un horario
export const deleteSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM Horarios WHERE ID_horario = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
