import {Router} from 'express'
import UserService from '../services/users'
import {createUserSchema, updateUserSchema} from '../utils/schemas/users'
import validationHandler from '../utils/middleware/validationHandler'

function userApi(app){
    const router = Router()
    app.use('/api/users', router);
    const userService = new UserService();


    router.get('/', async (req, res, next)=>{
        try{
            const users = await userService.getUsers()
            res.status(200).json({
                data: users,
                message: 'users listed'
            })
        }catch(error){
            next(error)
        }
    })

    router.get('/:userId', async (req, res, next)=>{
        try{
            const {userId} = req.params
            const user = await userService.getUser({userId})
            res.status(200).json({
                data: user,
                message: 'user finded'
            })
        }catch(error){
            next(error)
        }
    })

    router.post('/', validationHandler(createUserSchema), async (req, res, next)=>{
        try{
            const user = req.body;
            const createdUserId = await userService.createUser({user})
            res.status(200).json({
                data: createdUserId,
                message: 'user created'
            })
        }catch(error){
            next(error)
        }
    })

    router.put('/:userId', validationHandler(updateUserSchema), async (req, res, next)=>{
        try{
            const {userId} = req.params
            const user = req.body;
            const updatedUserId = await userService.updateUser({user, userId})
            res.status(200).json({
                data: updatedUserId,
                message: 'user updated'
            })
        }catch(error){
            next(error)
        }
    })

    router.delete('/:userId', async (req, res, next)=>{
        try{
            const {userId} = req.params
            const updatedUserId = await userService.deleteUser({userId})
            res.status(200).json({
                data: updatedUserId,
                message: 'user deleted'
            })
        }catch(error){
            next(error)
        }
    })

}

export default userApi;