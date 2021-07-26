import * as yup from 'yup'

const userNameSchema = yup.string()
const userEmailSchema = yup.string().email()
const userPasswordSchema = yup.string().min(6)
const userStatusSchema = yup.number()

export const createUserSchema = yup.object().shape({
    name: userNameSchema.required(),
    email: userEmailSchema.required(),
    password: userPasswordSchema.required()
})

export const createEmailUserSchema = yup.object().shape({
    email: userEmailSchema.required()
})

export const resetPasswordEmailSchema = yup.object().shape({
    email: userEmailSchema.required()
})

export const resetPasswordSchema = yup.object().shape({
    password: userPasswordSchema.required(),
    confirmPassword: userPasswordSchema.required(),
})

export const loginUserSchema = yup.object().shape({
    email: userEmailSchema.required(),
    password: userPasswordSchema.required()
})