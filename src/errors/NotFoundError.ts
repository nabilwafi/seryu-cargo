import { IErrorMessage } from '../interfaces/globalResponse.interface'
import CustomError from './CustomError'

class NotFoundError extends CustomError {
  statusCode = 404

  constructor(message?: string) {
    super(message ?? 'Not Found')

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  serializeErrors(): IErrorMessage[] {
    return [
      {
        message: this.message ?? 'Not Found'
      }
    ]
  }
}

export default NotFoundError
