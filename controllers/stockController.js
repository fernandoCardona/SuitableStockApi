//const bcrypt = require('bcrypt');
const mongoosePagination = require('mongoose-pagination');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const Stock = require('../models/StockModel');

//const userJWT = require('../services/userJWT');
//const validate = require("../helpers/brandValidate");



//2.1.1 Creamos los controller del Model stock:
//2.2.1- Creamos el metodo 'create' para stock:
const create = (req, res) => {
    //Recoger valores de la peticion:
    let stock = new Stock();
    let params = req.body;
     console.log('PARAMS:', req.body);
    // console.log('PARAMS:', params);
    // console.log('USER:', params);

    //Comprobar si los params required me lleguen bien (+validacion):
    if ( !params.ref  ) {

        return res.status(400).json({
            status: 'error',
            msg: 'Faltan datos por enviar.'
        });

    }
    //Validacion:
    // try {
    //     validate(params);
    // } catch (error) {
    //     return res.status(400).json({
    //         status: 'error',
    //         msg: 'Validacion no superada.'
    //     });
    // }
    

    //Comprobacion de usuario duplicado:
    Stock.find({ 
        $or: [
          { ref: params.ref.toLowerCase() }
        ]
    }).exec(async (error, stocks) =>{
        if (error) {
            return res.status(500).json({
                status: 'error',
                msg: 'error en la creacion de un nuevo stocks'
            });
        }
        if ( stocks && stocks.length >=1 ) {
            return res.status(200).send({
                status: 'succes',
                msg: 'El stock ya existe'
            });
        }
        

        //Crear el oobj de usuario con la password cifraza
        let stock_to_save = new Stock(params);
        console.log(stock_to_save)
        //Guardar ususario en la base de datos:
        stock_to_save.save( ( error, stockStored ) => {
            if (error || !stockStored) {//console.log(error);
                return res.status(500).send({
                    status: 'error',
                    msg: error
                }); 
                
            }
            
            //Devolver resultado:
            return res.status(200).json({
                status: 'success',
                msg: 'Brand Registrada correctamente.',
                user: stockStored
            });

        });    

    });
    

}
//2.4.1- creamos el lista de stocks:
const stockList = ( req, res ) => {
    
    //Controlar en que pagina estamos:
    let page = 1;
    if( req.params.page ) {
        page = req.params.page;
    }
    page = parseInt( page );

    //Consulta con mongoose-pagination:
    let itemPerPage = 5;
    Stock.find().sort('_id') .paginate( page, itemPerPage, async( error, stocks, total ) => {

        if ( error || !stocks ) {
            return res.status(404).send({
                status: 'error',
                msg: 'Error en la consulta de brands o no hay brands disponibles.'
            });
        }

   

        //Devolver resultado:(posteriormente info de follows)
        return res.status(200).send({
            status: 'success',
            stocks,
            page,
            itemPerPage,
            total,
            pages: Math.ceil(total/itemPerPage)
        });


    } ); 
}
 

module.exports =  {
    stockList,
    create

}