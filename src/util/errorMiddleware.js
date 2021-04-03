export default function errorMiddleware(error, req, res, next) {
    
    let errorObject = {
        status: 500,
        name: 'UnknownError',
        message: 'Internal Error'
    }

    res.status(errorObject.status).json(errorObject)
}