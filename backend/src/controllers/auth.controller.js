import jwt from 'jsonwebtoken'
import { crearUsuario, buscarPorCorreo, compararPassword } from '../services/usuarios.service.js'
import { validarRegistro, validarLogin } from '../validaciones.js'

function generarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRA || '2h' }
  )
}

export async function registrar(req, res, next) {
  try {
    const errores = validarRegistro(req.body)
    if (errores.length > 0) {
      return res.status(400).json({ error: errores[0] })
    }

    const existe = await buscarPorCorreo(req.body.correo)
    if (existe) {
      return res.status(409).json({ error: 'Ya existe una cuenta con ese correo' })
    }

    // el rol no se toma del body, lo pone la base como ciudadano
    const usuario = await crearUsuario(req.body)

    res.status(201).json({ usuario, token: generarToken(usuario) })
  } catch (error) {
    next(error)
  }
}

export async function iniciarSesion(req, res, next) {
  try {
    const errores = validarLogin(req.body)
    if (errores.length > 0) {
      return res.status(400).json({ error: errores[0] })
    }

    const usuario = await buscarPorCorreo(req.body.correo)
    if (!usuario) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' })
    }

    const coincide = await compararPassword(req.body.password, usuario.password_hash)
    if (!coincide) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' })
    }

    const datos = { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol }
    res.json({ usuario: datos, token: generarToken(datos) })
  } catch (error) {
    next(error)
  }
}

export function miPerfil(req, res) {
  res.json({ id: req.usuario.id, nombre: req.usuario.nombre, rol: req.usuario.rol })
}
