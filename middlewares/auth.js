//2.3.3- Middleware Auth:
//IMPORTAR DEPENDENCIAS:
const jwt = require('jwt-simple');
const moment = require('moment');

//Importar secretPass:
const libJWT = require('../services/userJWT');
const secretPass = libJWT.secretPass;

//Funcion Autentificacion:
exports.auth = (req, res, next) => {
    //Comprobar si llega la cabecera del auth:
    if (!req.headers.authorization) {
        return res.status(403).send({
            status: 'error',
            msg: 'La peticion no tiene headers de autentificacion'
        });
    }
    //Limpiamos el Token: ( con una expresion regular limpiamos las posibles comillas que puedan venir en el token)
    let token = req.headers.authorization.replace(/[`"]+/g, '');
    //Decodificar el Token:
    try {
        let payload = jwt.decode( token, secretPass );
        //comprobar expiracion del token:
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                status: 'error',
                msg: 'token expirado', 
                error
            });
        }
        //Agregar datos de usuario a la request:
        req.user = payload;
    } catch (error) {
        return res.status(404).send({
            status: 'error',
            msg: 'token invalido', 
            error
        });
    }
    
    //Pasar a la ejecucion de la accion:
    next();
}
