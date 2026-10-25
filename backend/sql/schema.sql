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
-- Las tres cuentas quedan con la contraseña '123456'

INSERT INTO usuarios (nombre, correo, rut, password_hash, rol) VALUES
('Carlos Ciudadano', 'carlos@correo.cl', '11.111.111-1', '$2a$10$uEKQYZU2tVXI2yr6mLdmAOSX5dMhXbv30dBQmAkBO2LRCu0D2PQj6', 'ciudadano'),
('Ana Vecina', 'ana@correo.cl', '22.222.222-2', '$2a$10$uEKQYZU2tVXI2yr6mLdmAOSX5dMhXbv30dBQmAkBO2LRCu0D2PQj6', 'ciudadano'),
('Luis Funcionario', 'luis@muni.cl', '33.333.333-3', '$2a$10$uEKQYZU2tVXI2yr6mLdmAOSX5dMhXbv30dBQmAkBO2LRCu0D2PQj6', 'funcionario');

-- El folio va escrito aca porque el backend solo lo arma cuando la solicitud entra por la API.
-- Las fechas van distintas para que la lista se ordene y no queden todas el mismo dia.
INSERT INTO solicitudes (folio, usuario_id, tipo, direccion, descripcion, estado, creada_en) VALUES
('#SD-2026-0001', 1, 'Alumbrado', 'Av. Central 123', 'Poste apagado hace una semana', 'En revisión', '2026-09-28 10:15'),
('#SD-2026-0002', 1, 'Vialidad', 'Calle Sur 45', 'Hoyo grande en la calle', 'En proceso', '2026-10-02 16:40'),
('#SD-2026-0003', 2, 'Aseo y limpieza', 'Plaza Norte', 'Basura acumulada en la plaza', 'Resuelto', '2026-10-07 09:05'),
('#SD-2026-0004', 2, 'Alumbrado', 'Pasaje Este 8', 'Foco roto en el pasaje', 'Rechazado', '2026-10-13 18:20'),
('#SD-2026-0005', 1, 'Aseo y limpieza', 'Avenida Mar 99', 'Escombros botados en la vereda', 'En revisión', '2026-10-18 11:30');

-- La fecha va escrita para que cada movimiento quede despues de la solicitud
-- a la que pertenece y no en el momento en que se carga este archivo.
INSERT INTO historial_estados (solicitud_id, estado, comentario, registrado_en) VALUES
(2, 'En proceso', 'Se derivó a obras públicas', '2026-10-05 09:30'),
(3, 'En proceso', 'Se asignó al camión de aseo', '2026-10-08 11:45'),
(3, 'Resuelto', 'Limpieza completada por el camión de aseo', '2026-10-10 15:10'),
(4, 'Rechazado', 'El poste pertenece a un condominio privado', '2026-10-15 12:00');
