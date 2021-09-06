import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import config from './config'
import topicsRoutes from './routes/topics.routes'


const app = express()
app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
// settings
app.set('port', config.port)

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(topicsRoutes)

export default app