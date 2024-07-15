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
          JOIN Peliculas p ON h.id_pelicula = p.id_pelicula
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
        JOIN Peliculas p ON b.id_pelicula = p.id_pelicula
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
