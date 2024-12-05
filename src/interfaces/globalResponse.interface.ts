export interface IErrorResponse {
  status: 'failed'
  statusCode: number
  errors: IErrorMessage[]
}

export interface IErrorMessage {
  message: string
  field?: string
}

export interface ISuccessResponse<T> {
  data: T
  total_row: number
  current: number
  page_size: number
}
