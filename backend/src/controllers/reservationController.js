import pool from '../config/db.js';


// Crear una nueva reserva y actualizar el estado de los asientos
export const createReservation = async (req, res) => {
  const { id_usuario, id_asientos, id_horario } = req.body;

  if (!Array.isArray(id_asientos) || id_asientos.length === 0) {
    return res.status(400).json({ error: 'id_asientos debe ser un array no vacío.' });
  }

  try {
    // Iniciar una transacción
    await pool.query('BEGIN');

    // Insertar reservas
    const insertQuery = 'INSERT INTO Reservas (ID_usuario, ID_horario) VALUES ($1,$2) returning id_reserva';
   
    const {rows}= await pool.query(insertQuery,[id_usuario,id_horario])
    console.log(rows)
     
    // Actualizar el estado de los asientos
    const updateQuery = 'UPDATE Asientos SET Disponible = FALSE WHERE ID_asiento = ANY($1::int[])';
    for(const boleto in id_asientos){
      await pool.query(updateQuery, [id_asientos]);
    }
    // Confirmar la transacción
    await pool.query('COMMIT');

    res.status(201).json({ id_reserva: rows[0].id_reserva });
    
    
  } catch (error) {
    // Revertir la transacción en caso de error
    await pool.query('ROLLBACK');
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
    // Iniciar una transacción
    await pool.query('BEGIN');

    // Obtener el ID del asiento asociado a la reserva
    const result = await pool.query('SELECT ID_asiento FROM Reservas WHERE ID_reserva = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    const id_asiento = result.rows[0].ID_asiento;

    // Eliminar la reserva
    await pool.query('DELETE FROM Reservas WHERE ID_reserva = $1 RETURNING *', [id]);

    // Restaurar el estado del asiento
    await pool.query('UPDATE Asientos SET Disponible = TRUE WHERE ID_asiento = $1', [id_asiento]);

    // Confirmar la transacción
    await pool.query('COMMIT');

    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    // Revertir la transacción en caso de error
    await pool.query('ROLLBACK');
    res.status(400).json({ error: error.message });
  }
};
