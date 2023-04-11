//Importamos dependencias:
const { Router } = require('express');
//Importamos Model UserModel:
const Stock           = require('../models/StockModel');
const StockController = require('../controllers/stockController');
const check           = require('../middlewares/auth');
const multer          = require('multer');

//4.1.0- Creamos la variable de la funcion Router:
const router = Router();

//4.2.0- CREAMOS LAS RUTAS PARA LOS SERVICIOS DEL MODELO stock:
//4.2.2-Ruta de crearun stock:
router.post("/create", check.auth, StockController.create);
//4.2.2-Ruta de ver stock:
router.get("/stockList", check.auth, StockController.stockList);


module.exports = router;