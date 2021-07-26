import UsersService from "../../services/users"
import { createEmailUserSchema, createUserSchema, loginUserSchema, resetPasswordEmailSchema, resetPasswordSchema } from "../schemas/users"
import {ObjectId} from 'mongodb'
import { USER_STATUS_ACTIVE, USER_STATUS_CREATED, USER_STATUS_DISABLED } from "../constants/userStatus"

class UserValidations extends UsersService{

    create = async (req) => {
        const {body} = req
        createUserSchema.validateSync(body)
        const user = await super.getUser( {query:{email: body.email}, projection:{_id: 1, status: 1}} )
        if(user){
            if(user.status !== USER_STATUS_DISABLED) throw new Error('El usuario ya existe')
            else req.user = user
        }
    }

    createEmail = async (req) => {
        const body = req.body
        createEmailUserSchema.validateSync(body)
        const user = await super.getUser( {query:{email: body.email}, projection:{_id: 1, status: 1}} )
        if(!user) throw new Error('El usuario no existe')
        if(user.status===USER_STATUS_CREATED || user.status===USER_STATUS_DISABLED){
            req.user = user
        }else if(user.status===USER_STATUS_ACTIVE){
            throw new Error("Tu cuenta ya esta activada")
        }else if(user.status===USER_STATUS_DISABLED){
            throw new Error("Tu cuenta esta bloqueada, contactanos para más información")
        }else{
            throw new Error("No puedes iniciar sesión, contactanos para más información")
        }
    }

    active = async (req) => {
        const {params} = req
        const user = await super.getUser( {query:{_id: ObjectId(params.userId)}, projection:{_id: 1, status: 1}}  )
        if(!user) throw new Error('El usuario no existe')
        if(user.status===USER_STATUS_CREATED || user.status===USER_STATUS_DISABLED){
            req.user = user
        }else if(user.status===USER_STATUS_ACTIVE){
            throw new Error("Tu cuenta ya esta activada")
        }else if(user.status===USER_STATUS_DISABLED){
            throw new Error("Tu cuenta esta bloqueada, contactanos para más información")
        }else{
            throw new Error("No puedes activar, contactanos para más información")
        }
    }

    resetPasswordEmail = async ({body}) => {
        resetPasswordEmailSchema.validateSync(body)
        const user = await super.getUser( {query:{email: body.email}, projection:{_id: 1}} )
        if(!user) throw new Error('El usuario no existe')
    }

    resetPassword = async ({body, params}) => {
        resetPasswordSchema.validateSync(body)
        if(body.password !== body.confirmPassword) throw new Error('Las contraseñas no coinciden')
        const user = await super.getUser( {query:{_id: ObjectId(params.userId)}, projection:{_id: 1}}  )
        if(!user) throw new Error('El usuario no existe')
    }

    login = async (req) => {
        const body = req.body
        loginUserSchema.validateSync(body)
        const user = await super.getUser( {query: {email: body.email} , projection:{_id: 1, status: 1, password: 1}}  )
        if(!user) throw new Error('El usuario no existe')
        if(user.password !== req.body.password) throw new Error('Contraseña incorrecta')
        
        switch (user.status) {
            case -2:
                throw new Error("El usuario no existe")
            case -1:
                throw new Error("Tu cuenta esta bloqueada, contactanos para más información")
            case 0:
                throw new Error("Comprueba tu correo electronico")
            case 1:
                req.user = user
                break;
            default:
                throw new Error("No puedes iniciar sesión, contactanos para más información")
        }
    }

    dissabled = async ({params}) => {
        const user = await super.getUser( {query:{_id: ObjectId(params.userId)}, projection:{_id: 1}}  )
        if(!user) throw new Error('El usuario no existe')
    }

}

export default UserValidations