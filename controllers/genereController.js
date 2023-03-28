//const bcrypt = require('bcrypt');
const mongoosePagination = require('mongoose-pagination');
const fs = require('fs');
const path = require('path');


const Genere = require('../models/GenereModel');

//const userJWT = require('../services/userJWT');
const validate = require("../helpers/genereValidate");



//2.1.1 Creamos los controller del Model genere:
//2.2.1- Creamos el metodo 'create' para genere:
const create = (req, res) => { console.log('Create genere')
    //Recoger valores de la peticion:
    let genere = new Genere();
    let params = req.body;
    // console.log('PARAMS:', req.body);
    // console.log('PARAMS:', params);
    // console.log('USER:', params);

    //Comprobar si los params required me lleguen bien (+validacion):
    if ( !params.name ) {

        return res.status(400).json({
            status: 'error',
            msg: 'Faltan datos por enviar.'
        });

    }
    //Validacion:
    try {
        validate(params);
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            msg: 'Validacion no superada.'
        });
    }
    

    //Comprobacion de usuario duplicado:
    Genere.find({ 
        $or: [
          { name: params.name.toLowerCase() }
        ]
    }).exec(async (error, generes) =>{
        if (error) {
            return res.status(500).json({
                status: 'error',
                msg: 'error en la creacion de una nueva Brand'
            });
        }
        if ( generes && generes.length >=1 ) {
            return res.status(200).send({
                status: 'succes',
                msg: 'Este genere ya existe'
            });
        }
        

        //Crear el oobj de usuario con la password cifraza
        let genere_to_save = new Genere(params);
        console.log(genere_to_save)
        //Guardar ususario en la base de datos:
        genere_to_save.save( ( error, genereStored ) => {
            if (error || !genereStored) {//console.log(error);
                return res.status(500).send({
                    status: 'error',
                    msg: error
                }); 
                
            }
            
            //Devolver resultado:
            return res.status(200).json({
                status: 'success',
                msg: 'Brand Registrada correctamente.',
                user: genereStored
            });

        });    

    });
    

}
//2.4.1- creamos el lista de generes:
const generesList = ( req, res ) => {
    
    //Controlar en que pagina estamos:
    let page = 1;
    if( req.params.page ) {
        page = req.params.page;
    }
    page = parseInt( page );

    //Consulta con mongoose-pagination:
    let itemPerPage = 5;
    Genere.find().sort('_id') .paginate( page, itemPerPage, async( error, generes, total ) => {

        if ( error || !generes ) {
            return res.status(404).send({
                status: 'error',
                msg: 'Error en la consulta de generes o no hay generes disponibles.'
            });
        }

   

        //Devolver resultado:(posteriormente info de follows)
        return res.status(200).send({
            status: 'success',
            generes,
            page,
            itemPerPage,
            total,
            pages: Math.ceil(total/itemPerPage)
        });


    } ); 
}
//16.1.0- Eliminar genere:
const deleteGenere = (req, res) => {
    //Obtener id de la publicacion de la url:
    const genereId = req.params.id;
    //Find con la condicion del id:
    Genere.find( {'_id':genereId}).deleteOne(error => {
        if (error) {
            return res.status(404).send({
                status: 'error',
                msg: 'No se ha encontrado el genere a eliminar.',
            });
        }
    
        //Devolver respuesta:
        return res.status(200).send({
            status: 'success',
            msg: 'Genere eliminada correctamente.',
            brand: genereId
        });  
    });
}

module.exports =  {
    create,
    generesList,
    deleteGenere
    
}