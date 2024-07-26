import pool from '../config/db.js';

// Crear un nuevo horario
export const createSchedule = async (req, res) => {
  const { id_pelicula, id_sala, fecha, horaInicio, horaFin } = req.body;

  try {
    // Verificar si hay un solapamiento con otros horarios en la misma sala
    const conflict = await pool.query(
      `SELECT * FROM Horarios 
       WHERE ID_sala = $1 AND Fecha = $2 AND 
       ((HoraInicio < $3 AND HoraFin > $3) OR (HoraInicio < $4 AND HoraFin > $4))`,
      [id_sala, fecha, horaFin, horaInicio]
    );

    if (conflict.rows.length > 0) {
      return res.status(400).json({ error: 'El horario se solapa con otro existente en la misma sala.' });
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

// Actualizar un horario
export const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const { id_pelicula, id_sala, fecha, horaInicio, horaFin } = req.body;

  try {
    // Verificar si hay un solapamiento con otros horarios en la misma sala
    const conflict = await pool.query(
      `SELECT * FROM Horarios 
       WHERE ID_sala = $1 AND Fecha = $2 AND 
       ((HoraInicio < $3 AND HoraFin > $3) OR (HoraInicio < $4 AND HoraFin > $4)) AND ID_horario != $5`,
      [id_sala, fecha, horaFin, horaInicio, id]
    );

    if (conflict.rows.length > 0) {
      return res.status(400).json({ error: 'El horario se solapa con otro existente en la misma sala.' });
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
