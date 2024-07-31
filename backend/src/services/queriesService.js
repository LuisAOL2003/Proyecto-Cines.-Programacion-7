import pool from '../config/db.js';

// Obtener detalles de los horarios y salas de una película
export const getMovieSchedulesAndHalls = async (movieId) => {
    try {
      const result = await pool.query(`
        SELECT 
          p.titulo AS pelicula_nombre,
          s.nombre AS sala_nombre,
          h.hora_inicio,
          h.hora_fin
        FROM 
          Horarios h
          JOIN Salas s ON h.id_sala = s.id_sala
          JOIN Películas p ON h.id_pelicula = p.id_pelicula
        WHERE
          p.id_pelicula = $1
      `, [movieId]);
  
      return result.rows;
    } catch (error) {
      throw new Error(error.message);
    }
  };

// Obtener detalles del boleto
export const getTicketDetails = async (ticketId) => {
  try {
    const result = await pool.query(`
      SELECT 
        u.nombre AS usuario_nombre,
        u.apellido AS usuario_apellido,
        c.nombre AS cine_nombre,
        p.titulo AS pelicula_nombre,
        s.nombre AS sala_nombre,
        a.numero AS asiento_numero,
        b.fecha_compra,
        b.precio
      FROM 
        Boletos b
        JOIN Usuarios u ON b.id_usuario = u.id_usuario
        JOIN Cines c ON b.id_cine = c.id_cine
        JOIN Películas p ON b.id_pelicula = p.id_pelicula
        JOIN Salas s ON b.id_sala = s.id_sala
        JOIN Asientos a ON b.id_asiento = a.id_asiento
      WHERE
        b.id_boleto = $1
    `, [ticketId]);

    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener detalles de una reserva con información de boletos
export const getReservationDetails = async (reservationId) => {
  try {
    const result = await pool.query(`
      SELECT 
        h.ID_horario,
        r.ID_reserva,
        u.ID_usuario,
        u.Email AS usuario_email,
        r.Fecha AS fecha_reserva,
        h.horainicio,
        h.horafin
      FROM 
        Reservas r
        JOIN Usuarios u ON r.ID_usuario = u.ID_usuario
        JOIN Horarios h ON r.ID_horario = h.ID_horario
      WHERE
        r.ID_reserva = $1
    `, [reservationId]);

    console.log(result.rows)
    const resultHoarios = await pool.query(
      `
      SELECT
      p.ID_pelicula,
      s.ID_sala,
      p.título As titulo_pelicula,
      p.imagenurl AS imagen_pelicula,
      s.nombre AS nombre_sala
      FROM
      Horarios h
      JOIN Películas p ON h.ID_pelicula = p.ID_pelicula
      JOIN Salas s ON h.ID_sala = s.ID_sala
      WHERE
      h.ID_horario = ${result.rows[0].id_horario}
      `
      
    )
    console.log(resultHoarios.rows)

  
      
    if (result.rows.length === 0) {
      return null;  // En caso de que no se encuentre la reserva
    }
    const reservationDetails = {
      ...result.rows[0],
      ...resultHoarios.rows[0],
      selectedSeats: [] , // Inicialmente vacío, ya que se pasará desde el frontend
      asientos: result.rows.map(row => row.asiento_numero)
    };

    return reservationDetails;
  } catch (error) {
    throw new Error(error.message);
  }
};
