import pool from '../config/db.js';
import { getTicketDetails, getReservationDetails } from '../services/queriesService.js';

// Crear un nuevo boleto
export const createTicket = async (req, res) => {
  const { id_reserva, id_pelicula, id_sala, id_asiento, id_usuario, precio } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO Boletos (ID_reserva, ID_pelicula, ID_sala, ID_asiento, ID_usuario, Precio) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id_reserva, id_pelicula, id_sala, id_asiento, id_usuario, precio]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un boleto por ID
export const getTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM Boletos WHERE ID_boleto = $1', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un boleto por ID
export const updateTicket = async (req, res) => {
  const { id } = req.params;
  const { id_reserva, id_pelicula, id_sala, id_asiento, id_usuario, precio } = req.body;

  try {
    const result = await pool.query(
      `UPDATE Boletos SET ID_reserva = $1, ID_pelicula = $2, ID_sala = $3, ID_asiento = $4, ID_usuario = $5, Precio = $6 
       WHERE ID_boleto = $7 RETURNING *`,
      [id_reserva, id_pelicula, id_sala, id_asiento, id_usuario, precio, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un boleto por ID
export const deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM Boletos WHERE ID_boleto = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los boletos
export const getAllTickets = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Boletos');
    res.json(result.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Joins

// Obtener detalles de una reserva
export const getReservationDetailsController = async (req, res) => {
  const { id } = req.params;

  try {
    const reservationDetails = await getReservationDetails(id);
    if (!reservationDetails) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(reservationDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Obtener detalles de un boleto
export const getTicketDetailsController = async (req, res) => {
  const { id } = req.params;

  try {
    const ticketDetails = await getTicketDetails(id);
    res.json(ticketDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
