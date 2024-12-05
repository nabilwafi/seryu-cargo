import express from 'express'
import 'express-async-errors'
import './configs/connectDB'
import routes from './routes'
import errorHandler from './middlewares/errorHandler'
import notFoundHandler from './middlewares/notFoundHandler'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

routes(app)

app.all('*', notFoundHandler)

app.use(errorHandler)

export default app
