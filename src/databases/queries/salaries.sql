/* @name GetAllSalaryDriverQuery */
SELECT 
  d.driver_code, 
  d.name,
  COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) :: INTEGER AS "total_pending!",
  COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) :: INTEGER AS "total_confirmed!",
  COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) :: INTEGER AS "total_paid!",
  COALESCE(COUNT(da.driver_code) * :salary_config! :: INTEGER, 0) :: INTEGER AS "total_attendance_salary!",
  (COUNT(da.driver_code) * :salary_config! :: INTEGER 
    + COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) 
    + COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) 
    + COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0)) :: INTEGER AS "total_salary!",
  COALESCE(COUNT(DISTINCT s.*), 0) :: INTEGER AS "count_shipment!"
FROM drivers AS d
INNER JOIN driver_attendances AS da 
  ON da.driver_code = d.driver_code AND da.attendance_status = true
INNER JOIN shipment_costs AS sc 
  ON sc.driver_code = d.driver_code
INNER JOIN shipments AS s 
  ON s.shipment_no = sc.shipment_no 
  AND s.shipment_status != 'CANCELLED' 
  AND EXTRACT(MONTH FROM s.shipment_date) = :month! :: INTEGER
  AND EXTRACT(YEAR FROM s.shipment_date) = :year! :: INTEGER
WHERE (:driver_code :: VARCHAR IS NULL OR d.driver_code = :driver_code)
  AND (:name :: VARCHAR IS NULL OR d.name LIKE '%' || :name || '%')
GROUP BY d.driver_code, d.name
HAVING (COUNT(da.driver_code) * :salary_config! :: INTEGER 
      + COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) 
      + COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) 
      + COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0)) > 0
    AND (
          CASE WHEN :status = 'PENDING' THEN (COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) > 0)
          WHEN :status = 'CONFIRMED' THEN (COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) > 0)
          WHEN :status = 'PAID' THEN 
            ( COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) > 0 
              AND COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) = 0
              AND COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) = 0
            )
          ELSE true
          END
        )
LIMIT :page_size! :: INTEGER OFFSET :page! :: INTEGER;

/* @name GetTotalAllSalaryDriverQuery */
SELECT 
  COUNT(DISTINCT d.driver_code) AS "total_data!" 
FROM (
    SELECT 
  d.driver_code, 
  d.name,
  COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) AS "total_pending!",
  COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) AS "total_confirmed!",
  COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) AS "total_paid!",
  COALESCE(COUNT(da.driver_code) * :salary_config! :: INTEGER, 0) AS "total_attendance_salary!",
  (COUNT(da.driver_code) * :salary_config! :: INTEGER 
    + COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) 
    + COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) 
    + COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0)) AS "total_salary!",
  COALESCE(COUNT(DISTINCT s.*), 0) AS "count_shipment!"
FROM drivers AS d
INNER JOIN driver_attendances AS da 
  ON da.driver_code = d.driver_code AND da.attendance_status = true
INNER JOIN shipment_costs AS sc 
  ON sc.driver_code = d.driver_code
INNER JOIN shipments AS s 
  ON s.shipment_no = sc.shipment_no 
  AND s.shipment_status != 'CANCELLED' 
  AND EXTRACT(MONTH FROM s.shipment_date) = :month! :: INTEGER
  AND EXTRACT(YEAR FROM s.shipment_date) = :year! :: INTEGER
WHERE (:driver_code :: VARCHAR IS NULL OR d.driver_code = :driver_code)
  AND (:name :: VARCHAR IS NULL OR d.name LIKE '%' || :name || '%')
GROUP BY d.driver_code, d.name
HAVING (COUNT(da.driver_code) * :salary_config! :: INTEGER 
      + COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) 
      + COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) 
      + COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0)) > 0
    AND (
          CASE WHEN :status = 'PENDING' THEN (COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) > 0)
          WHEN :status = 'CONFIRMED' THEN (COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) > 0)
          WHEN :status = 'PAID' THEN 
            ( COALESCE(SUM(CASE WHEN sc.cost_status = 'PAID' THEN sc.total_costs ELSE 0 END), 0) > 0 
              AND COALESCE(SUM(CASE WHEN sc.cost_status = 'PENDING' THEN sc.total_costs ELSE 0 END), 0) = 0
              AND COALESCE(SUM(CASE WHEN sc.cost_status = 'CONFIRMED' THEN sc.total_costs ELSE 0 END), 0) = 0
            )
          ELSE true
          END
        )
) AS d;

/* @name GetVariableConfigQuery */
SELECT key, value :: INTEGER FROM variable_configs WHERE key = :key! :: VARCHAR LIMIT 1;