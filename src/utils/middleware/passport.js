import {Strategy, ExtractJwt} from 'passport-jwt';
import config from '../../config/config';
import UsersService from "../../services/users"
import { USER_STATUS_BLOCKED } from '../constants/userStatus';
import { ObjectId } from 'mongodb';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.JWT.SECRET,
    ignoreExpiration: true
};

export default new Strategy(options, async (payload, done) => {
    try{
        const userService = new UsersService();
        const user = await userService.getUser({query: {_id: ObjectId(payload._id)}})
        if(user){
            if(user.status === USER_STATUS_BLOCKED) throw new Error("Tu cuenta esta bloqueada, contactanos para más información")
            return done(null, user)
        }
        return done(null, false)
    }catch(error){
        console.log(error)
        return done(error, false)
    }
})
