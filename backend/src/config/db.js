import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
})

// Siempre con parametros ($1, $2) para evitar inyeccion SQL
export function consultar(sql, parametros = []) {
  return pool.query(sql, parametros)
}
