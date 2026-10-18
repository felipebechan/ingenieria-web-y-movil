-- Base de datos de Santo Domingo Responde
-- Crear primero la base:  CREATE DATABASE santo_domingo;
-- Y despues ejecutar este archivo:  psql -d santo_domingo -f sql/schema.sql

DROP TABLE IF EXISTS solicitudes;
DROP TABLE IF EXISTS usuarios;

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

-- PENDIENTE (Tomás): tabla historial_estados y los datos iniciales de prueba.
-- Revisa tareas-equipo/tomas/instrucciones.txt
