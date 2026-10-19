-- Base de datos de Santo Domingo Responde
-- Crear primero la base:  CREATE DATABASE santo_domingo;
-- Y despues ejecutar este archivo:  psql -d santo_domingo -f sql/schema.sql

DROP TABLE IF EXISTS historial_estados CASCADE;
DROP TABLE IF EXISTS solicitudes CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(120) NOT NULL UNIQUE,
  rut VARCHAR(12) NOT NULL UNIQUE,
  telefono VARCHAR(20),
  password_hash VARCHAR(100) NOT NULL,
  rol VARCHAR(20) NOT NULL DEFAULT 'ciudadano',
  creado_en TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT rol_valido CHECK (rol IN ('ciudadano', 'funcionario'))
);

CREATE TABLE solicitudes (
  id SERIAL PRIMARY KEY,
  folio VARCHAR(20) UNIQUE,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  tipo VARCHAR(50) NOT NULL,
  descripcion TEXT NOT NULL,
  direccion VARCHAR(150),
  estado VARCHAR(20) NOT NULL DEFAULT 'En revisión',
  creada_en TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT estado_valido CHECK (estado IN ('En revisión', 'En proceso', 'Resuelto', 'Rechazado'))
);

CREATE INDEX idx_solicitudes_usuario ON solicitudes(usuario_id);

-- El folio queda nulo al insertar y el backend lo completa con el id recien creado

-- Tabla para guardar por qué estados fue pasando una solicitud.
CREATE TABLE historial_estados (
  id SERIAL PRIMARY KEY,
  solicitud_id INTEGER NOT NULL REFERENCES solicitudes(id),
  estado VARCHAR(20) NOT NULL,
  comentario TEXT,
  registrado_en TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT estado_historial_valido CHECK (estado IN ('En revisión', 'En proceso', 'Resuelto', 'Rechazado'))
);

-- Índice para optimizar las búsquedas por solicitud
CREATE INDEX idx_historial_solicitud ON historial_estados(solicitud_id);

-- DATOS DE PRUEBA
-- Nota: El hash corresponde a la contraseña '123456'

INSERT INTO usuarios (nombre, correo, rut, password_hash, rol) VALUES
('Carlos Ciudadano', 'carlos@correo.cl', '11111111-1', '$2a$10$wN/a0B3uP6.HOn6G1g3Pyeu5uJzU3iM6P6K3R4f8y0yO6b5gR6AOS', 'ciudadano'),
('Ana Vecina', 'ana@correo.cl', '22222222-2', '$2a$10$wN/a0B3uP6.HOn6G1g3Pyeu5uJzU3iM6P6K3R4f8y0yO6b5gR6AOS', 'ciudadano'),
('Luis Funcionario', 'luis@muni.cl', '33333333-3', '$2a$10$wN/a0B3uP6.HOn6G1g3Pyeu5uJzU3iM6P6K3R4f8y0yO6b5gR6AOS', 'funcionario');

INSERT INTO solicitudes (usuario_id, tipo, direccion, descripcion, estado) VALUES
(1, 'alumbrado', 'Av. Central 123', 'Poste apagado', 'En revisión'),
(1, 'bache', 'Calle Sur 45', 'Hoyo en la calle', 'En proceso'),
(2, 'basura', 'Plaza Norte', 'Basura acumulada', 'Resuelto'),
(2, 'alumbrado', 'Pasaje Este 8', 'Foco roto', 'Rechazado'),
(1, 'basura', 'Avenida Mar 99', 'Escombros', 'En revisión');

INSERT INTO historial_estados (solicitud_id, estado, comentario) VALUES
(2, 'En proceso', 'Se derivó a obras públicas'),
(3, 'Resuelto', 'Limpieza completada por el camión de aseo'),
(4, 'Rechazado', 'El poste pertenece a condominio privado');