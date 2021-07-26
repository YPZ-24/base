import jwt from 'jsonwebtoken';
import config from '../../config/config';

export function createJwt({userId}){
    return jwt.sign({_id: userId}, config.JWT.SECRET, {expiresIn: 86400});
}