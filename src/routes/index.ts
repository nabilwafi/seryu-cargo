import type { Application, Router } from 'express'
import salaryDriverRoutes from './salaries/v1/driver.routes'

const _routes: Array<[string, Router]> = [['/v1/salary', salaryDriverRoutes]]

const routes = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}

export default routes
