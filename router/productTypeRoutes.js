//Importamos dependencias:
const { Router } = require('express');
//Importamos Model UserModel:
const ProductType = require('../models/ProductTypeModel');
const ProductTypeController = require('../controllers/productTypeController');
const check = require('../middlewares/auth');

//4.1.0- Creamos la variable de la funcion Router:
const router = Router();

//4.2.0- CREAMOS LAS RUTAS PARA LOS SERVICIOS DEL MODELO productType:
//4.2.1-Ruta de creacion de un nuevo productType:
router.post("/create",  ProductTypeController.create);
//4.2.2-Ruta de ver productType:
router.get("/productTypes/:page?", check.auth, ProductTypeController.productTypeList);
//4.2.3-Ruta de cruta actualizar productType:
// router.put('/', (req, res) => {
//     res.send('Hola mundo estoy en la ruta actualizar productType');
// });
//4.2.4-Ruta de borrar productType:
router.delete("/delete/:id", check.auth,  ProductTypeController.deleteProductType);

module.exports = router;