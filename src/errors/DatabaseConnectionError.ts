import { IErrorMessage } from '../../src/interfaces/globalResponse.interface'
import CustomError from './CustomError'

class DatabaseConnectionError extends CustomError {
  statusCode = 500
  reasons = 'Error connecting to database'

  constructor() {
    super('Error connecting to db')

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }

  serializeErrors(): IErrorMessage[] {
    return [
      {
        message: this.reasons
      }
    ]
  }
}

export default DatabaseConnectionError
