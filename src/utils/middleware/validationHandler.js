import boom from '@hapi/boom'

function validationHandler(validation){
    return async (req, res, next) => {
        try{
            await validation(req);
            next();
        }catch(error){
            next( boom.badRequest(error) );
        }
    }
}

export default validationHandler
