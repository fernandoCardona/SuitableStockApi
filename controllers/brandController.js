//const bcrypt = require('bcrypt');
const mongoosePagination = require('mongoose-pagination');
const multer = require('multer');
const fs = require('fs');
const path = require('path');


const Brand = require('../models/BrandModel');

//const userJWT = require('../services/userJWT');
const validate = require("../helpers/brandValidate");



//2.1.1 Creamos los controller del Model brand:
//2.2.1- Creamos el metodo 'create' para brand:
const create = (req, res) => {
    //Recoger valores de la peticion:
    let brand = new Brand();
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
    Brand.find({ 
        $or: [
          { name: params.name.toLowerCase() }
        ]
    }).exec(async (error, brands) =>{
        if (error) {
            return res.status(500).json({
                status: 'error',
                msg: 'error en la creacion de una nueva Brand'
            });
        }
        if ( brands && brands.length >=1 ) {
            return res.status(200).send({
                status: 'succes',
                msg: 'La Brand ya existe'
            });
        }
        

        //Crear el oobj de usuario con la password cifraza
        let brand_to_save = new Brand(params);
        console.log(brand_to_save)
        //Guardar ususario en la base de datos:
        brand_to_save.save( ( error, brandStored ) => {
            if (error || !brandStored) {//console.log(error);
                return res.status(500).send({
                    status: 'error',
                    msg: error
                }); 
                
            }
            
            //Devolver resultado:
            return res.status(200).json({
                status: 'success',
                msg: 'Brand Registrada correctamente.',
                user: brandStored
            });

        });    

    });
    

}
//2.4.1- creamos el lista de brands:
const brandsList = ( req, res ) => {
    
    //Controlar en que pagina estamos:
    let page = 1;
    if( req.params.page ) {
        page = req.params.page;
    }
    page = parseInt( page );

    //Consulta con mongoose-pagination:
    let itemPerPage = 5;
    Brand.find().sort('_id') .paginate( page, itemPerPage, async( error, brands, total ) => {

        if ( error || !brands ) {
            return res.status(404).send({
                status: 'error',
                msg: 'Error en la consulta de brands o no hay brands disponibles.'
            });
        }

   

        //Devolver resultado:(posteriormente info de follows)
        return res.status(200).send({
            status: 'success',
            brands,
            page,
            itemPerPage,
            total,
            pages: Math.ceil(total/itemPerPage)
        });


    } ); 
}
//2.5.1- creamos el subir logo del brand:
const uploadLogo = ( req, res ) => {
    //Obtener fichero imagen y combrobar que existe:
    if (!req.file) {
        return res.status(400).send({
            status: 'error',
            msg: 'Peticion no incluye imagen.'
        });
    }
    //Obtener nombre del archivo:
    let logo = req.file.originalname;

    //Obtener extension del archivo:
    const logoSplit = logo.split('\.');
    const extension = logoSplit[1];

    //Comprovamos extension del archivo:
    if ( extension != 'png' && extension != 'jpg' && extension != 'jpeg' && extension != 'gif' ) {

        const filePath = req.file.path;
        //Si la extension no es correcta borramos el archivo:
        const fileDeleted = fs.unlinkSync(filePath);

        return res.status(400).send({
            status: 'error',
            msg: 'extension del archivo invalida.'
        });

    }
    
    //Si la extension es correcta, guardamos la imagen en la base de datos:
    Brand.findOneAndUpdate( {_id: req.brand.id}, {logo: req.file.filename}, {new: true}, (error, brandUpdated) => {

        if (error || !brandUpdated) {
            return res.status(500).send({
                status: 'error',
                msg: 'Error en la subida del logo.'
            });
        }
        //Devolver Respuesta:
        return res.status(200).send({
            status: 'success',
            msg: 'Metodo de Subida imagenes.', 
            user: brandUpdated,
            file: req.file
        });
    })  
}
//2.6.1- creamos el mostrar logo del brand:
const showLogo = ( req, res ) => {
    //Obtener parametro de la url:
    const file = req.params.file;
     
    //Montar el path real de la avatarImg:
    const logoPath = './upload/brandsLogos/' + file;
    //Comprovar que avatarImg existe:
    fs.stat( logoPath, ( error, exists ) => {
        if ( !exists ) {
            return res.status(404).send({
                status: 'error',
                msg: 'No existe el logo.' 
            });
        }
        //Devolver Respuesta con la avatarImg:
        return res.sendFile(path.resolve(logoPath));
    });
    //devolvemos el file avatarImg:

    
}
//2.7.1- creamos el Profil del brand:
const profile = ( req, res ) => {
    //Recibir el parametro de id del brand:
    const id = req.params.id
    //Consulta para obtener los datos del brand:
    Brand.findById(id)
        .select({password:0})
        .exec( async(error, brandProfile) => {
        if ( error || !brandProfile ) {
            return res.status(404).send({
                status: 'error',
                msg: 'La Brand no existe o hay un error'
            });
        }

        //Devolver resultado:
        return res.status(200).send({
            status: 'success',
            user: brandProfile,
            
        });

    });
    
}
//16.1.0- Eliminar publicaciones:
const deleteBrand = (req, res) => {
    //Obtener id de la publicacion de la url:
    const brandId = req.params.id;
    //Find con la condicion del id:
    Brand.find( {'_id':brandId}).deleteOne(error => {
        if (error) {
            return res.status(404).send({
                status: 'error',
                msg: 'No se ha encontrado la brand a eliminar.',
            });
        }
    
        //Devolver respuesta:
        return res.status(200).send({
            status: 'success',
            msg: 'Brand eliminada correctamente.',
            brand: brandId
        });  
    });
}

module.exports =  {
    create,
    brandsList,
    uploadLogo,
    showLogo,
    profile,
    deleteBrand

}