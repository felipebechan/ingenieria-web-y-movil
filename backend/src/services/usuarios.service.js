import bcrypt from 'bcryptjs'
import { consultar } from '../config/db.js'

export async function crearUsuario({ nombre, correo, rut, telefono, password }) {
  const hash = await bcrypt.hash(password, 10)

  const { rows } = await consultar(
    `INSERT INTO usuarios (nombre, correo, rut, telefono, password_hash)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, nombre, correo, rol`,
    [nombre, correo, rut, telefono, hash]
  )

  return rows[0]
}

export async function buscarPorCorreo(correo) {
  const { rows } = await consultar('SELECT * FROM usuarios WHERE correo = $1', [correo])
  return rows[0]
}

export async function buscarPorRut(rut) {
  const { rows } = await consultar('SELECT id FROM usuarios WHERE rut = $1', [rut])
  return rows[0]
}

export function compararPassword(password, hash) {
  return bcrypt.compare(password, hash)
}
