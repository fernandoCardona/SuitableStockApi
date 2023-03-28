const validator = require('validator');

const validate = (params) => {
    let name = !validator.isEmpty(params.name) &&
                validator.isLength(params.name,{min: 2, max: undefined}) &&
                validator.isAlpha(params.name, 'en-US');
                 

    
    let surname = !validator.isEmpty(params.surname) &&
                   validator.isLength(params.surname,{min: 2, max: undefined}) &&
                   validator.isAlpha(params.surname, 'en-US');
                    
    
    
    let email = !validator.isEmpty(params.email) &&
                 validator.isEmail(params.email);
                 console.log('email ok')
 
    let password = !validator.isStrongPassword(params.password);
  


   
 
   if ( !name || !surname || !email || !password  ) { console.log('if ok')
        throw new Error('No se ha superado la validacion');
   }else {
        console.log('Validacion Superada');
   }
}


module.exports = validate
