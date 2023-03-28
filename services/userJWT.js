//4.2.1- JWT
//Importamos dependencias para JWT:
const jwt = require('jwt-simple');
const moment = require('moment');
//Secret Password for JWT:
const secretPass = 'CLAVE_SECRETA_my_socialNetword_666';
//Crear funcion para generar token:
const createToken = ( user ) => {
    const payload = {
        id: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        bio: user.bio,
        role: user.role,
        avatar_img: user.avatar_img,
        //iat: momento de creacion del token, creado con moment:
        iat: moment().unix(),
        //exp: Fecha de expiracion del token a 30 dias, , creado con moment:
        exp: moment().add(30, 'days').unix()
    }

    //DevolverJWT token codificado;
    return jwt.encode(payload, secretPass);
}

module.exports =  {
    secretPass,
    createToken
}