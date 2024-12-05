import { Application, Router } from 'express'
import { getAllDriverSalaries } from '../../../controllers/salary.controller'

const driverRouter = Router()

driverRouter.get('/driver/list', getAllDriverSalaries as Application)

export default driverRouter
