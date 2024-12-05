import { Pool } from 'pg'
import 'dotenv/config'
import logger from '../../src/utils/logger'
import DatabaseConnectionError from '../../src/errors/DatabaseConnectionError'

const pool = new Pool({
  user: process.env.DB_USER!,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT)!
})

pool
  .once('connect', () => {
    logger.info('Database Successfully Connected')
  })
  .on('error', () => {
    throw new DatabaseConnectionError()
  })

export default pool
