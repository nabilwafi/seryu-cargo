/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import CustomError from '../../src/errors/CustomError'
import { jsonResponseError } from '../../src/utils/jsonResponse'

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    jsonResponseError(res, err.serializeErrors(), err.statusCode)
    return
  }

  jsonResponseError(
    res,
    [
      {
        message:
          process.env.NODE_ENV == 'production'
            ? 'Something went error'
            : err.message
      }
    ],
    500
  )
  return
}

export default errorHandler
