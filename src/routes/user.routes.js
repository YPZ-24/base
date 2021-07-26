import {Router} from 'express'
import UserService from '../services/users'
import validationHandler from '../utils/middleware/validationHandler'
import { USER_STATUS_ACTIVE, USER_STATUS_CREATED, USER_STATUS_DISABLED } from '../utils/constants/userStatus'
import UserValidations from '../utils/validations/users'
import routeHelper from '../utils/middleware/routeHelper'
import config from '../config/config'
import { sendEmail } from '../utils/mailer/mailer'
import {ObjectId} from 'mongodb'
import { createJwt } from '../utils/jwt/jwt'
import { encrypt } from '../utils/bcypt/bcryp'

function userApi(app){
    const router = Router()
    app.use('/api/users', router);
    const userService = new UserService();
    const userValidations = new UserValidations();


    router.post('/', validationHandler(userValidations.create), routeHelper(async (req, res) => {
        let userId
        if(!req.user){
            const user = req.body;
            user.password = await encrypt({original: user.password})
            user.status = USER_STATUS_CREATED
            userId = await userService.createUser({user})
        }else{
            userId = await userService.updateUser({
                userId: ObjectId(req.user._id),
                user: {status: USER_STATUS_CREATED}
            })
        }

        res.status(201).json({
            data: {userId},
            message: 'Usuario creado',
            statusCode: 201
        })
    }))

    router.post('/email', validationHandler(userValidations.createEmail), routeHelper(async (req, res) => {
        const createdUserId = req.user._id
        
        //SEND EMAIL TO VALIDATE USER
        const subject = "Validar cuenta"
        const urlActive = `http://${config.DOMAIN.NAME}/validate/${createdUserId}`
        const contentHTML = `
            <h2>Hola...!</h2>
            <p>Para concluir tu registro, solo debes entrar a...</p>
            <p>${urlActive}</p>
        `
        await sendEmail({contentHTML, subject, email: req.body.email})

        res.status(201).json({
            message: 'Revisa tu correo electrónico',
            statusCode: 201
        })
    }))

    router.patch('/:userId/status/active', validationHandler(userValidations.active), routeHelper(async(req, res)=>{
        const {userId} = req.params
        const updatedUserId = await userService.updateUser({
            userId: ObjectId(userId),
            user: {status: USER_STATUS_ACTIVE}
        })

        res.status(200).json({
            data: {userId: updatedUserId},
            message: 'Listo',
            statusCode: 200
        })
    }))

    router.patch('/:userId/status/dissabled', validationHandler(userValidations.dissabled), routeHelper(async (req, res)=>{
        const {userId} = req.params
        const updatedUserId = await userService.updateUser({
            userId: ObjectId(userId),
            user: {status: USER_STATUS_DISABLED}
        })
        res.status(200).json({
            data: {userId: updatedUserId},
            message: 'Usuario desactivado'
        })
    })) 

    router.post('/resetPassword/email', validationHandler(userValidations.resetPasswordEmail), routeHelper(async(req, res)=>{
        const user = await userService.getUser({query: {email: req.body.email}, projection: {_id: 1, email: 1}})
        const urlReset = `http://${config.DOMAIN.NAME}/resetPassword/${user._id}`
        const subject = "Recuperar Contraseña"
        const contentHTML = `
            <h2>Hola...!</h2>
            <p>Escuchamos que olvidaste tu contraseña, para recuperarla entra a...</p>
            <p>${urlReset}</p>
        `
        await sendEmail({contentHTML, subject, email: user.email})

        res.status(200).json({
            message: 'Revisa tu correo electrónico',
            statusCode: 200
        })
    }))

    router.patch('/:userId/resetPassword', validationHandler(userValidations.resetPassword), routeHelper(async(req, res)=>{
        const {password} = req.body
        const {userId} = req.params
        const updatedUserId = await userService.updateUser({
            userId: ObjectId(userId),
            user: {password}
        })

        res.status(200).json({
            data: {userId: updatedUserId},
            message: 'Contraseña actualizada',
            statusCode: 200
        })
    }))

    router.post('/login', validationHandler(userValidations.login), routeHelper(async(req, res)=>{
        //GENERAR TOKEN
        const jwt = createJwt({userId: req.user._id })
        res.status(200).json({
            data: { 
                jwt
            },
            message: 'Bienvenido',
            statusCode: 200
        })
    }))

    

}

export default userApi;