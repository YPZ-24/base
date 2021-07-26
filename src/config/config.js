require('dotenv').config()

export default {
    PORT: process.env.PORT || 8000,
    JWT:{
        SECRET: process.env.JWT_SECRET
    },
    BCRYP:{
        SALT: Number(process.env.BCRYPT_SALT)
    },
    DOMAIN: {
        NAME: process.env.DOMAIN_NAME || 'localhost:8000',
        EMAIL: {
            USER: process.env.DOMAIN_EMAIL_USER,
            PORT: process.env.DOMAIN_EMAIL_PORT,
            PASSWORD: process.env.DOMAIN_EMAIL_PASSWORD,
        }
    }, 
    DB: {
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        HOST: process.env.DB_HOST,
        NAME: process.env.DB_NAME
    }
}