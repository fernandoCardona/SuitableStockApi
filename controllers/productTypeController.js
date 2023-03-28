//const bcrypt = require('bcrypt');
const mongoosePagination = require('mongoose-pagination');
//const multer = require('multer');
const fs = require('fs');
const path = require('path');


const ProductType = require('../models/ProductTypeModel');

//const userJWT = require('../services/userJWT');
const validate = require("../helpers/productTypeValidation");



//2.1.1 Creamos los controller del Model productType:
//2.2.1- Creamos el metodo 'create' para productType:
const create = (req, res) => {
    //Recoger valores de la peticion:
    let productType = new ProductType();
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
    ProductType.find({ 
        $or: [
          { name: params.name.toLowerCase() }
        ]
    }).exec(async (error, productTypes) =>{
        if (error) {
            return res.status(500).json({
                status: 'error',
                msg: 'error en la creacion de una nueva ProductType'
            });
        }
        if ( productTypes && productTypes.length >=1 ) {
            return res.status(200).send({
                status: 'succes',
                msg: 'La ProductType ya existe'
            });
        }
        

        //Crear el oobj de usuario con la password cifraza
        let productType_to_save = new ProductType(params);
        console.log(productType_to_save)
        //Guardar ususario en la base de datos:
        productType_to_save.save( ( error, productTypeStored ) => {
            if (error || !productTypeStored) {//console.log(error);
                return res.status(500).send({
                    status: 'error',
                    msg: error
                }); 
                
            }
            
            //Devolver resultado:
            return res.status(200).json({
                status: 'success',
                msg: 'Brand Registrada correctamente.',
                user: productTypeStored
            });

        });    

    });
    

}
//2.4.1- creamos el lista de brands:
const productTypeList = ( req, res ) => {
    
    //Controlar en que pagina estamos:
    let page = 1;
    if( req.params.page ) {
        page = req.params.page;
    }
    page = parseInt( page );

    //Consulta con mongoose-pagination:
    let itemPerPage = 5;
    ProductType.find().sort('_id') .paginate( page, itemPerPage, async( error, productTypes, total ) => {

        if ( error || !productTypes ) {
            return res.status(404).send({
                status: 'error',
                msg: 'Error en la consulta de productTypes o no hay productTypes disponibles.'
            });
        }

   

        //Devolver resultado:(posteriormente info de follows)
        return res.status(200).send({
            status: 'success',
            productTypes,
            page,
            itemPerPage,
            total,
            pages: Math.ceil(total/itemPerPage)
        });


    } ); 
}
//16.1.0- Eliminar publicaciones:
const deleteProductType = (req, res) => {
    //Obtener id de la publicacion de la url:
    const productTypeId = req.params.id;
    //Find con la condicion del id:
    ProductType.find( {'_id':productTypeId}).deleteOne(error => {
        if (error) {
            return res.status(404).send({
                status: 'error',
                msg: 'No se ha encontrado el productType a eliminar.',
            });
        }
    
        //Devolver respuesta:
        return res.status(200).send({
            status: 'success',
            msg: 'productType eliminada correctamente.',
            brand: productTypeId
        });  
    });
}

module.exports =  {
    create,
    productTypeList,
    deleteProductType
    

}