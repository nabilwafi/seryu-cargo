import { IErrorMessage } from '../interfaces/globalResponse.interface'

abstract class CustomError extends Error {
  abstract statusCode: number

  constructor(message: string) {
    super(message)
  }

  serializeErrors(): IErrorMessage[] {
    return [
      {
        message: this.message
      }
    ]
  }
}

export default CustomError
