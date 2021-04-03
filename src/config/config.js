require('dotenv').config()

export default {
    PORT: process.env.PORT || 8000,
    DB: {
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        HOST: process.env.DB_HOST,
        NAME: process.env.DB_NAME
    }
}