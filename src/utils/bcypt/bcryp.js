import config from '../../config/config'
import bcrypt from 'bcrypt'

export const isMatch = async ({original, encrypted}) => {
    return await bcrypt.compare(original, encrypted);
}

export const encrypt = async (original) => {
    const salt = await bcrypt.genSalt(config.BCRYP.SALT);
    const encrypted = await bcrypt.hash(original.toString(), salt);
    return encrypted
}
