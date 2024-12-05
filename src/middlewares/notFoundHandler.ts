/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express'
import NotFoundError from '../../src/errors/NotFoundError'

const notFoundHandler = async (req: Request, res: Response) => {
  throw new NotFoundError()
}

export default notFoundHandler
