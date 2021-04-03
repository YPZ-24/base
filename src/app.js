import express from 'express'
import cors from 'cors';
import userRoute from './routes/user.routes'
import config from './config/config'
import errorMiddleware from './util/errorMiddleware'

//INSTANCE EXPRESS
let app = express()

//SETTINGS
app.set('PORT', config.PORT)

//MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}))

//ROUTES
app.use('/api/users', userRoute)

//ERROR MIDDLEWARE
app.use(errorMiddleware)

export default app;
