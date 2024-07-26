
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

// Función auxiliar para generar y guardar tokens
const generateAndSaveTokens = async (user) => {
  const accessToken = jwt.sign(
    { id: user.id_usuario, role: user.id_rol, name: user.nombre },
    process.env.JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { id: user.id_usuario, role: user.id_rol, name: user.nombre },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '30d' }
  );

  await pool.query(
    'UPDATE Usuarios SET refreshToken = $1 WHERE id_usuario = $2',
    [refreshToken, user.id_usuario]
  );

  return { accessToken, refreshToken };
};

// Función para registrar usuario en la tabla de usuarios
export const registerUser = async (req, res) => {
  const { name, last_name, email, password } = req.body;

  try {
    // Toma el ID del tipo de usuario Cliente de la tabla de roles y lo almacena en una variable y después se lo pasa al INSERT
    const roleResult = await pool.query('SELECT ID_rol FROM Roles WHERE Nombre = $1', ['Cliente']);
    const roleId = roleResult.rows[0].id_rol;

    const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña
    const result = await pool.query(
      'INSERT INTO Usuarios (Nombre, Apellido, Email, Contraseña, ID_Rol) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, last_name, email, hashedPassword, roleId]
    );

    const tokens = await generateAndSaveTokens(result.rows[0]);

    res.status(201).json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Función para iniciar sesión
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM Usuarios WHERE Email = $1', [email]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.contraseña); // Compara la contraseña proporcionada con la contraseña encriptada almacenada
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const tokens = await generateAndSaveTokens(user);

    res.json(tokens);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Función para renovar tokens
export const refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(403).json({ error: 'No token provided.' });
  }

  try {
    const result = await pool.query('SELECT * FROM Usuarios WHERE refreshToken = $1', [token]);
    const user = result.rows[0];
    if (!user) {
      return res.status(403).json({ error: 'Invalid refresh token.' });
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Refresh token has expired.' });
      }

      const newAccessToken = jwt.sign(
        { id: decoded.id, role: decoded.role, name: decoded.name },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Función para cerrar sesión
export const logoutUser = async (req, res) => {
  const { id } = req.body;

  try {
    await pool.query('UPDATE Usuarios SET refreshToken = NULL WHERE id_usuario = $1', [id]);
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
