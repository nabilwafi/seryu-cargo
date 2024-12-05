import pool from '../../src/configs/connectDB'
import {
  getAllSalaryDriverQuery,
  getTotalAllSalaryDriverQuery,
  getVariableConfigQuery,
  IGetAllSalaryDriverQueryResult
} from '../../src/databases/queries/salaries.queries'
import NotFoundError from '../../src/errors/NotFoundError'

export const getAllSalary = async (
  month: number,
  year: number,
  page: number,
  page_size: number,
  driver_code?: string,
  status?: string,
  name?: string
): Promise<{
  data: IGetAllSalaryDriverQueryResult[]
  total_data: string
}> => {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')

    const salaryConfig = await getVariableConfigQuery.run(
      {
        key: 'DRIVER_MONTHLY_ATTENDANCE_SALARY'
      },
      client
    )

    if (salaryConfig.length == 0) throw new NotFoundError('data not found')

    const data = await getAllSalaryDriverQuery.run(
      {
        salary_config: Number(salaryConfig[0].value),
        page,
        page_size,
        month,
        year,
        driver_code,
        status,
        name
      },
      client
    )

    const total_data = await getTotalAllSalaryDriverQuery.run(
      {
        month,
        year,
        salary_config: Number(salaryConfig[0].value),
        status,
        name,
        driver_code
      },
      client
    )

    await client.query('COMMIT')

    return {
      data,
      total_data: total_data[0].total_data
    }
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  }
}
