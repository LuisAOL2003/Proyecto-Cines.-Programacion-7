CREATE DATABASE Proyecto_Cines;

USE Proyecto_Cines;

-- Creacion tabla de Roles

CREATE TABLE Roles (
ID_rol serial PRIMARY KEY,
Nombre VARCHAR(50) NOT NULL
);

-- Creacion tabla de Usuarios

CREATE TABLE Usuarios (
ID_usuario serial PRIMARY KEY,
Nombre VARCHAR(50) NOT NULL,
Apellido VARCHAR(50) NOT NULL,
Email VARCHAR(100) NOT NULL UNIQUE,
Contraseña VARCHAR(100) NOT NULL,
refreshToken VARCHAR(255),
ID_Rol INT,
FOREIGN KEY (ID_Rol) REFERENCES Roles(ID_rol)
);

-- Creacion tabla de Peliculas

CREATE TABLE Películas (
ID_pelicula SERIAL PRIMARY KEY,
Título VARCHAR(100) NOT NULL,
Descripción TEXT,
Duración INT NOT NULL,
Clasificación VARCHAR(10),
Género VARCHAR(50),
ImagenURL TEXT,
FechaEstreno DATE,
IdiomaOriginal VARCHAR(50)
);

-- Creacion tabla de Cines

CREATE TABLE Cines (
ID_cine SERIAL PRIMARY KEY,
Nombre VARCHAR(100) NOT NULL,
Dirección TEXT NOT NULL,
Ciudad VARCHAR(100) NOT NULL,
Estado VARCHAR(100),
CódigoPostal VARCHAR(20)
);

-- Creacion tabla de Salas

CREATE TABLE Salas (
ID_sala serial PRIMARY KEY ,
Nombre VARCHAR(50) NOT NULL,
Capacidad INT NOT NULL,
ID_Cine INT,
FOREIGN KEY (ID_Cine) REFERENCES Cines(ID_cine)
);

-- Creacion tabla de Asientos

CREATE TABLE Asientos (
ID_asiento SERIAL PRIMARY KEY,
Fila VARCHAR(5) NOT NULL,
Numero INT NOT NULL,
Disponible BOOLEAN DEFAULT TRUE,
ID_sala INT NOT NULL,
ID_pelicula INT NOT NULL,
FOREIGN KEY (ID_pelicula) REFERENCES Películas(ID_pelicula),
FOREIGN KEY (ID_sala) REFERENCES Salas(ID_sala)
);

-- Creacion tabla de Horarios

CREATE TABLE Horarios (
ID_horario SERIAL PRIMARY KEY,
Fecha DATE NOT NULL,
HoraInicio TIME NOT NULL,
HoraFin TIME NOT NULL,
ID_pelicula INT NOT NULL,
ID_sala INT NOT NULL,
FOREIGN KEY (ID_pelicula) REFERENCES Películas(ID_pelicula),
FOREIGN KEY (ID_sala) REFERENCES Salas(ID_sala)
);

-- Creacion tabla de Reservas

CREATE TABLE Reservas (
ID_reserva SERIAL PRIMARY KEY,
Fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ID_usuario INT NOT NULL,
ID_horario INT NOT NULL,
FOREIGN KEY (ID_usuario) REFERENCES Usuarios(ID_usuario),
FOREIGN KEY (ID_horario) REFERENCES Horarios(ID_horario),
);

-- Creacion tabla de Cartelera

CREATE TABLE Cartelera (
ID_cartelera SERIAL PRIMARY KEY ,
ID_Película INT,
FechaInicio DATE NOT NULL,
FechaFin DATE NOT NULL,
Tipo VARCHAR(20) NOT NULL,
FOREIGN KEY (ID_Película) REFERENCES Películas(ID_pelicula)
);

-- Creacion tabla de Boletos

CREATE TABLE Boletos (
ID_boleto SERIAL PRIMARY KEY,
ID_reserva INT NOT NULL,
ID_pelicula INT NOT NULL,
ID_sala INT NOT NULL,
ID_asiento INT NOT NULL,
ID_usuario INT NOT NULL,
FechaCompra TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
Precio DECIMAL(10, 2) NOT NULL,
FOREIGN KEY (ID_reserva) REFERENCES Reservas(ID_reserva),
FOREIGN KEY (ID_pelicula) REFERENCES Películas(ID_pelicula),
FOREIGN KEY (ID_sala) REFERENCES Salas(ID_sala),
FOREIGN KEY (ID_asiento) REFERENCES Asientos(ID_asiento),
FOREIGN KEY (ID_usuario) REFERENCES Usuarios(ID_usuario)
);


-- Inserción en Roles

INSERT INTO Roles (Nombre) VALUES ('Administrador');
INSERT INTO Roles (Nombre) VALUES ('Cliente');
