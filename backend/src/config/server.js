
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './db.js'; // Importa la conexión a la base de datos
import routes from '../routes/routes.js'; // Importa las rutas

// Inicializa dotenv para gestionar variables de entorno
dotenv.config();

// Crea una instancia de Express
const app = express();

// Middleware
// Configura CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:8080', // Cambia esto a la URL de tu frontend en producción
  credentials: true
}));

app.use(express.json()); // Permite recibir y enviar datos en formato JSON

// Usar rutas
app.use('/api', routes);

// Configura la carpeta de archivos estáticos para producción
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'dist')));

// Configura la ruta catch-all para que todas las rutas no manejadas por el backend sirvan el archivo index.html
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Puerto en el que escuchará el servidor
const PORT = process.env.PORT || 3000;

// Inicia el servidor y conecta a la base de datos
pool.connect()
  .then(client => {
    client.release();
    console.log('Conexión a la base de datos establecida.');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

export default app;
