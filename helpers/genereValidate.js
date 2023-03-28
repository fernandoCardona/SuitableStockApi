const validator = require('validator');

const validate = (params) => {
    let name = !validator.isEmpty(params.name) &&
                validator.isLength(params.name,{min: 2, max: undefined}) &&
                validator.isAlpha(params.name, 'en-US');
                 
 
   if ( !name ) {
        throw new Error('No se ha superado la validacion')
   }else {
        console.log('Validacion Superada');
   }
}


module.exports = validate