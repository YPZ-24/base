import boom from '@hapi/boom'

function validationHandler(schema, check='body'){
    return function(req, res, next){
        schema.validate(req[check], {strict: true}).then(()=>{
            next()
        }).catch((error)=>{
            next(boom.badRequest(error))
        })
    }
}

export default validationHandler