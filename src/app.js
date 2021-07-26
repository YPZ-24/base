import express from 'express'
import cors from 'cors';
import userApi from './routes/user.routes'
import config from './config/config'
import {errorHandler, wrapError} from './utils/middleware/errorHandler'
import notFoundHandler from './utils/middleware/notFoundHandler';
import passport from 'passport'
import passportMiddleware from './utils/middleware/passport'

//INSTANCE EXPRESS
let app = express()

//SETTINGS
app.set('PORT', config.PORT)

//MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(passport.initialize());
passport.use(passportMiddleware);

//ROUTES
userApi(app)

//ERROR MIDDLEWARE
app.use(wrapError)
app.use(errorHandler)

//NOT FOUND
app.use(notFoundHandler)

export default app;
