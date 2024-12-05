import { Request, Response } from 'express'
import { getDriveSalariesServices } from '../../src/services/salary.services'
import BadRequestError from '../../src/errors/BadRequestError'
import { jsonResponseSuccess } from '../../src/utils/jsonResponse'
import { IGetAllSalaryDriverQueryResult } from '../../src/databases/queries/salaries.queries'

export const getAllDriverSalaries = async (req: Request, res: Response) => {
  const {
    month,
    year,
    current = 1,
    page_size = 10,
    driver_code,
    status,
    name
  } = req.query

  if (!month || !year) throw new BadRequestError('month or year are required')

  const offset = (Number(current) - 1) * Number(page_size)

  const { data, total_data } = await getDriveSalariesServices(
    Number(month),
    Number(year),
    Number(offset),
    Number(page_size),
    driver_code ? String(driver_code) : undefined,
    status ? String(status) : undefined,
    name ? String(name) : undefined
  )

  return jsonResponseSuccess<IGetAllSalaryDriverQueryResult[]>(
    res,
    data,
    200,
    Number(total_data),
    Number(current),
    Number(page_size)
  )
}
