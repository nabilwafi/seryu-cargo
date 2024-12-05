import { getAllSalary } from '../../src/repositories/salary.repository'

export const getDriveSalariesServices = async (
  month: number,
  year: number,
  page: number,
  page_size: number,
  driver_code?: string,
  status?: string,
  name?: string
) => {
  const result = await getAllSalary(
    month,
    year,
    page,
    page_size,
    driver_code,
    status,
    name
  )

  return result
}
