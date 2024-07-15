import express from 'express';
import {createTicket,getTicketById,updateTicket,deleteTicket,getAllTickets, getTicketDetailsController} from '../controllers/ticketController.js';
import verifyToken from '../middlewares/verifyToken.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();

// Rutas para los boletos
router.post('/tickets', verifyToken, createTicket); // Crear un nuevo boleto
router.get('/tickets/:id', verifyToken, getTicketById); // Obtener un boleto por ID
router.put('/tickets/:id', verifyToken, verifyAdmin, updateTicket); // Actualizar un boleto por ID (solo admin)
router.delete('/tickets/:id', verifyToken, verifyAdmin, deleteTicket); // Eliminar un boleto por ID (solo admin)
router.get('/tickets', verifyToken, getAllTickets); // Obtener todos los boletos
router.get('/tickets/:id', verifyToken, getTicketDetailsController); // Obtener detalles de un boleto por ID

export default router;
