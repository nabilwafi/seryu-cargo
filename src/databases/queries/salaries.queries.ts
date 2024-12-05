/** Types generated for queries found in "src/databases/queries/salaries.sql" */
import { PreparedQuery } from '@pgtyped/runtime'

/** 'GetAllSalaryDriverQuery' parameters type */
export interface IGetAllSalaryDriverQueryParams {
  driver_code?: string | null | void
  month: number
  name?: string | null | void
  page: number
  page_size: number
  salary_config: number
  status?: string | null | void
  year: number
}

/** 'GetAllSalaryDriverQuery' return type */
export interface IGetAllSalaryDriverQueryResult {
  count_shipment: number
  driver_code: string
  name: string
  total_attendance_salary: number
  total_confirmed: number
  total_paid: number
  total_pending: number
  total_salary: number
}

/** 'GetAllSalaryDriverQuery' query type */
export interface IGetAllSalaryDriverQueryQuery {
  params: IGetAllSalaryDriverQueryParams
  result: IGetAllSalaryDriverQueryResult
}

const getAllSalaryDriverQueryIR: any = {
  usedParamSet: {
    salary_config: true,
    month: true,
    year: true,
    driver_code: true,
    name: true,
    status: true,
    page_size: true,
    page: true
  },
  params: [
    {
      name: 'salary_config',
      required: true,
      transform: { type: 'scalar' },
      locs: [
        { a: 429, b: 443 },
        { a: 529, b: 543 },
        { a: 1556, b: 1570 }
      ]
    },
    {
      name: 'month',
      required: true,
      transform: { type: 'scalar' },
      locs: [{ a: 1273, b: 1279 }]
    },
    {
      name: 'year',
      required: true,
      transform: { type: 'scalar' },
      locs: [{ a: 1335, b: 1340 }]
    },
    {
      name: 'driver_code',
      required: false,
      transform: { type: 'scalar' },
      locs: [
        { a: 1360, b: 1371 },
        { a: 1411, b: 1422 }
      ]
    },
    {
      name: 'name',
      required: false,
      transform: { type: 'scalar' },
      locs: [
        { a: 1432, b: 1436 },
        { a: 1479, b: 1483 }
      ]
    },
    {
      name: 'status',
      required: false,
      transform: { type: 'scalar' },
      locs: [
        { a: 1902, b: 1908 },
        { a: 2034, b: 2040 },
        { a: 2170, b: 2176 }
      ]
    },
    {
      name: 'page_size',
      required: true,
      transform: { type: 'scalar' },
      locs: [{ a: 2577, b: 2587 }]
    },
    {
      name: 'page',
      required: true,
      transform: { type: 'scalar' },
      locs: [{ a: 2607, b: 2612 }]
    }
  ],
  statement:
    "SELECT \n  d.driver_code, \n  d.name,\n  COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) :: INTEGER AS \"total_pending!\",\n  COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) :: INTEGER AS \"total_confirmed!\",\n  COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) :: INTEGER AS \"total_paid!\",\n  COALESCE(COUNT(da.driver_code) * :salary_config! :: INTEGER, 0) :: INTEGER AS \"total_attendance_salary!\",\n  (COUNT(da.driver_code) * :salary_config! :: INTEGER \n    + COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) \n    + COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) \n    + COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0)) :: INTEGER AS \"total_salary!\",\n  COALESCE(COUNT(DISTINCT s.*), 0) :: INTEGER AS \"count_shipment!\"\nFROM drivers AS d\nINNER JOIN driver_attendances AS da \n  ON da.driver_code = d.driver_code AND da.attendance_status = true\nINNER JOIN shipment_costs AS sc \n  ON sc.driver_code = d.driver_code\nINNER JOIN shipments AS s \n  ON s.shipment_no = sc.shipment_no \n  AND s.shipment_status != 'CANCELLED' \n  AND EXTRACT(MONTH FROM s.shipment_date) = :month! :: INTEGER\n  AND EXTRACT(YEAR FROM s.shipment_date) = :year! :: INTEGER\nWHERE (:driver_code :: VARCHAR IS NULL OR d.driver_code = :driver_code)\n  AND (:name :: VARCHAR IS NULL OR d.name LIKE '%' || :name || '%')\nGROUP BY d.driver_code, d.name\nHAVING (COUNT(da.driver_code) * :salary_config! :: INTEGER \n      + COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) \n      + COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) \n      + COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0)) > 0\n    AND (\n          CASE WHEN :status = 'PENDING' THEN (COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) > 0)\n          WHEN :status = 'CONFIRMED' THEN (COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) > 0)\n          WHEN :status = 'PAID' THEN \n            ( COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) > 0 \n              AND COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) = 0\n              AND COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) = 0\n            )\n          ELSE true\n          END\n        )\nLIMIT :page_size! :: INTEGER OFFSET :page! :: INTEGER"
}

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *   d.driver_code,
 *   d.name,
 *   COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) :: INTEGER AS "total_pending!",
 *   COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) :: INTEGER AS "total_confirmed!",
 *   COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) :: INTEGER AS "total_paid!",
 *   COALESCE(COUNT(da.driver_code) * :salary_config! :: INTEGER, 0) :: INTEGER AS "total_attendance_salary!",
 *   (COUNT(da.driver_code) * :salary_config! :: INTEGER
 *     + COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0)
 *     + COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0)
 *     + COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0)) :: INTEGER AS "total_salary!",
 *   COALESCE(COUNT(DISTINCT s.*), 0) :: INTEGER AS "count_shipment!"
 * FROM drivers AS d
 * INNER JOIN driver_attendances AS da
 *   ON da.driver_code = d.driver_code AND da.attendance_status = true
 * INNER JOIN shipment_costs AS sc
 *   ON sc.driver_code = d.driver_code
 * INNER JOIN shipments AS s
 *   ON s.shipment_no = sc.shipment_no
 *   AND s.shipment_status != 'CANCELLED'
 *   AND EXTRACT(MONTH FROM s.shipment_date) = :month! :: INTEGER
 *   AND EXTRACT(YEAR FROM s.shipment_date) = :year! :: INTEGER
 * WHERE (:driver_code :: VARCHAR IS NULL OR d.driver_code = :driver_code)
 *   AND (:name :: VARCHAR IS NULL OR d.name LIKE '%' || :name || '%')
 * GROUP BY d.driver_code, d.name
 * HAVING (COUNT(da.driver_code) * :salary_config! :: INTEGER
 *       + COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0)
 *       + COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0)
 *       + COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0)) > 0
 *     AND (
 *           CASE WHEN :status = 'PENDING' THEN (COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) > 0)
 *           WHEN :status = 'CONFIRMED' THEN (COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) > 0)
 *           WHEN :status = 'PAID' THEN
 *             ( COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) > 0
 *               AND COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) = 0
 *               AND COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) = 0
 *             )
 *           ELSE true
 *           END
 *         )
 * LIMIT :page_size! :: INTEGER OFFSET :page! :: INTEGER
 * ```
 */
export const getAllSalaryDriverQuery = new PreparedQuery<
  IGetAllSalaryDriverQueryParams,
  IGetAllSalaryDriverQueryResult
>(getAllSalaryDriverQueryIR)

/** 'GetTotalAllSalaryDriverQuery' parameters type */
export interface IGetTotalAllSalaryDriverQueryParams {
  driver_code?: string | null | void
  month: number
  name?: string | null | void
  salary_config: number
  status?: string | null | void
  year: number
}

/** 'GetTotalAllSalaryDriverQuery' return type */
export interface IGetTotalAllSalaryDriverQueryResult {
  total_data: string
}

/** 'GetTotalAllSalaryDriverQuery' query type */
export interface IGetTotalAllSalaryDriverQueryQuery {
  params: IGetTotalAllSalaryDriverQueryParams
  result: IGetTotalAllSalaryDriverQueryResult
}

const getTotalAllSalaryDriverQueryIR: any = {
  usedParamSet: {
    salary_config: true,
    month: true,
    year: true,
    driver_code: true,
    name: true,
    status: true
  },
  params: [
    {
      name: 'salary_config',
      required: true,
      transform: { type: 'scalar' },
      locs: [
        { a: 465, b: 479 },
        { a: 554, b: 568 },
        { a: 1559, b: 1573 }
      ]
    },
    {
      name: 'month',
      required: true,
      transform: { type: 'scalar' },
      locs: [{ a: 1276, b: 1282 }]
    },
    {
      name: 'year',
      required: true,
      transform: { type: 'scalar' },
      locs: [{ a: 1338, b: 1343 }]
    },
    {
      name: 'driver_code',
      required: false,
      transform: { type: 'scalar' },
      locs: [
        { a: 1363, b: 1374 },
        { a: 1414, b: 1425 }
      ]
    },
    {
      name: 'name',
      required: false,
      transform: { type: 'scalar' },
      locs: [
        { a: 1435, b: 1439 },
        { a: 1482, b: 1486 }
      ]
    },
    {
      name: 'status',
      required: false,
      transform: { type: 'scalar' },
      locs: [
        { a: 1905, b: 1911 },
        { a: 2037, b: 2043 },
        { a: 2173, b: 2179 }
      ]
    }
  ],
  statement:
    "SELECT \n  COUNT(DISTINCT d.driver_code) AS \"total_data!\" \nFROM (\n    SELECT \n  d.driver_code, \n  d.name,\n  COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) AS \"total_pending!\",\n  COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) AS \"total_confirmed!\",\n  COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) AS \"total_paid!\",\n  COALESCE(COUNT(da.driver_code) * :salary_config! :: INTEGER, 0) AS \"total_attendance_salary!\",\n  (COUNT(da.driver_code) * :salary_config! :: INTEGER \n    + COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) \n    + COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) \n    + COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0)) AS \"total_salary!\",\n  COALESCE(COUNT(DISTINCT s.*), 0) AS \"count_shipment!\"\nFROM drivers AS d\nINNER JOIN driver_attendances AS da \n  ON da.driver_code = d.driver_code AND da.attendance_status = true\nINNER JOIN shipment_costs AS sc \n  ON sc.driver_code = d.driver_code\nINNER JOIN shipments AS s \n  ON s.shipment_no = sc.shipment_no \n  AND s.shipment_status != 'CANCELLED' \n  AND EXTRACT(MONTH FROM s.shipment_date) = :month! :: INTEGER\n  AND EXTRACT(YEAR FROM s.shipment_date) = :year! :: INTEGER\nWHERE (:driver_code :: VARCHAR IS NULL OR d.driver_code = :driver_code)\n  AND (:name :: VARCHAR IS NULL OR d.name LIKE '%' || :name || '%')\nGROUP BY d.driver_code, d.name\nHAVING (COUNT(da.driver_code) * :salary_config! :: INTEGER \n      + COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) \n      + COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) \n      + COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0)) > 0\n    AND (\n          CASE WHEN :status = 'PENDING' THEN (COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) > 0)\n          WHEN :status = 'CONFIRMED' THEN (COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) > 0)\n          WHEN :status = 'PAID' THEN \n            ( COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) > 0 \n              AND COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) = 0\n              AND COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) = 0\n            )\n          ELSE true\n          END\n        )\n) AS d"
}

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *   COUNT(DISTINCT d.driver_code) AS "total_data!"
 * FROM (
 *     SELECT
 *   d.driver_code,
 *   d.name,
 *   COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) AS "total_pending!",
 *   COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) AS "total_confirmed!",
 *   COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) AS "total_paid!",
 *   COALESCE(COUNT(da.driver_code) * :salary_config! :: INTEGER, 0) AS "total_attendance_salary!",
 *   (COUNT(da.driver_code) * :salary_config! :: INTEGER
 *     + COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0)
 *     + COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0)
 *     + COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0)) AS "total_salary!",
 *   COALESCE(COUNT(DISTINCT s.*), 0) AS "count_shipment!"
 * FROM drivers AS d
 * INNER JOIN driver_attendances AS da
 *   ON da.driver_code = d.driver_code AND da.attendance_status = true
 * INNER JOIN shipment_costs AS sc
 *   ON sc.driver_code = d.driver_code
 * INNER JOIN shipments AS s
 *   ON s.shipment_no = sc.shipment_no
 *   AND s.shipment_status != 'CANCELLED'
 *   AND EXTRACT(MONTH FROM s.shipment_date) = :month! :: INTEGER
 *   AND EXTRACT(YEAR FROM s.shipment_date) = :year! :: INTEGER
 * WHERE (:driver_code :: VARCHAR IS NULL OR d.driver_code = :driver_code)
 *   AND (:name :: VARCHAR IS NULL OR d.name LIKE '%' || :name || '%')
 * GROUP BY d.driver_code, d.name
 * HAVING (COUNT(da.driver_code) * :salary_config! :: INTEGER
 *       + COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0)
 *       + COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0)
 *       + COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0)) > 0
 *     AND (
 *           CASE WHEN :status = 'PENDING' THEN (COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) > 0)
 *           WHEN :status = 'CONFIRMED' THEN (COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) > 0)
 *           WHEN :status = 'PAID' THEN
 *             ( COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) > 0
 *               AND COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) = 0
 *               AND COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) = 0
 *             )
 *           ELSE true
 *           END
 *         )
 * ) AS d
 * ```
 */
export const getTotalAllSalaryDriverQuery = new PreparedQuery<
  IGetTotalAllSalaryDriverQueryParams,
  IGetTotalAllSalaryDriverQueryResult
>(getTotalAllSalaryDriverQueryIR)

/** 'GetVariableConfigQuery' parameters type */
export interface IGetVariableConfigQueryParams {
  key: string
}

/** 'GetVariableConfigQuery' return type */
export interface IGetVariableConfigQueryResult {
  key: string
  value: number | null
}

/** 'GetVariableConfigQuery' query type */
export interface IGetVariableConfigQueryQuery {
  params: IGetVariableConfigQueryParams
  result: IGetVariableConfigQueryResult
}

const getVariableConfigQueryIR: any = {
  usedParamSet: { key: true },
  params: [
    {
      name: 'key',
      required: true,
      transform: { type: 'scalar' },
      locs: [{ a: 63, b: 67 }]
    }
  ],
  statement:
    'SELECT key, value :: INTEGER FROM variable_configs WHERE key = :key! :: VARCHAR LIMIT 1'
}

/**
 * Query generated from SQL:
 * ```
 * SELECT key, value :: INTEGER FROM variable_configs WHERE key = :key! :: VARCHAR LIMIT 1
 * ```
 */
export const getVariableConfigQuery = new PreparedQuery<
  IGetVariableConfigQueryParams,
  IGetVariableConfigQueryResult
>(getVariableConfigQueryIR)
