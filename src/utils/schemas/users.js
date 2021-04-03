import * as yup from 'yup'

const userNameSchema = yup.string()
const userAgeSchema = yup.number().min(1)

export const createUserSchema = yup.object().shape({
    name: userNameSchema.required(),
    age: userAgeSchema.required()
})

export const updateUserSchema = yup.object().shape({
    name: userNameSchema,
    age: userAgeSchema
})