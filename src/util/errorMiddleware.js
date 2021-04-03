export default function errorMiddleware(error, req, res, next) {
    
    let errorObject = {
        status: 500,
        name: 'UnknownError',
        message: 'Internal Error'
    }
    console.log(error);
    res.status(errorObject.status).json(errorObject)
}