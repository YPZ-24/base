const boom = require('@hapi/boom')

export function wrapError(error, req, res, next){
    if(!error.isBoom){
        next(boom.badImplementation(error));
    }
    next(error)
}

export function errorHandler(error, req, res, next) {
    const {output: {statusCode, payload}} = error;

    console.log(error);
    res.status(statusCode).json(payload)
}