import { IErrorMessage } from '../interfaces/globalResponse.interface'
import CustomError from './CustomError'

class BadRequestError extends CustomError {
  statusCode = 400

  constructor(public message: string) {
    super(message)

    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors(): IErrorMessage[] {
    return [
      {
        message: this.message
      }
    ]
  }
}

export default BadRequestError
