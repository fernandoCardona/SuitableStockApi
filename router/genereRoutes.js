//Importamos dependencias:
const { Router } = require('express');
//Importamos Model UserModel:
const Genere = require('../models/GenereModel');
const GenereController = require('../controllers/genereController');
const check = require('../middlewares/auth');


//4.1.0- Creamos la variable de la funcion Router:
const router = Router();

//4.2.0- CREAMOS LAS RUTAS PARA LOS SERVICIOS DEL MODELO Genere:
//4.2.1-Ruta de creacion de un nuevo Genere:
router.post("/create", GenereController.create);
//4.2.2-Ruta de Lista Genere:
router.get("/generes/:page?", check.auth, GenereController.generesList);
//4.2.4-Ruta de borrar Genere:
router.delete("/delete/:id", check.auth,  GenereController.deleteGenere);

module.exports = router;