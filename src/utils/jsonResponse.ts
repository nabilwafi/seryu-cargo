import { Response } from 'express'
import {
  IErrorMessage,
  IErrorResponse,
  ISuccessResponse
} from '../interfaces/globalResponse.interface'

export const jsonResponseError = (
  res: Response,
  errors: IErrorMessage[],
  statusCode: number
) => {
  const errorResponse: IErrorResponse = {
    status: 'failed',
    statusCode,
    errors
  }

  return res.status(statusCode).json(errorResponse)
}

export const jsonResponseSuccess = <T>(
  res: Response,
  data: T,
  statusCode: number,
  total_row: number,
  current: number,
  page_size: number
) => {
  const responseData: ISuccessResponse<T> = {
    data,
    total_row,
    current,
    page_size
  }

  return res.status(statusCode).json(responseData)
}
