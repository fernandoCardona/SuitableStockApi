//Importamos dependencias:
const { Router } = require('express');
//Importamos Model UserModel:
const Brand = require('../models/BrandModel');
const BrandController = require('../controllers/brandController');
const check = require('../middlewares/auth');
const multer = require('multer');

//4.1.0- Creamos la variable de la funcion Router:
const router = Router();

//Configuracion de subida de archivos:
const storage = multer.diskStorage({
    destination: (req, file, cd ) => {
        cd ( null, './upload/brandsLogos/' );
    },
    filename:  (req, file, cb) => {
        cb( null, 'logo-' + Date.now() + '-' + file.originalname );
    }
});

const uploads = multer({ storage});

//4.2.0- CREAMOS LAS RUTAS PARA LOS SERVICIOS DEL MODELO BRAND:
//4.2.1-Ruta de creacion de un nuevo brand:
router.post("/create", BrandController.create);
//4.2.2-Ruta de ver brandList:
router.get("/brands/:page?", check.auth, BrandController.brandsList);
//2.5.2- Creamos la ruta 'uploadLogo' para brand:
router.post("/uploadLogo", [check.auth, uploads.single('file0')], BrandController.uploadLogo);
//2.6.2- Creamos la ruta 'showLogo' para brand:
router.get("/showLogo/:file", BrandController.showLogo );
//2.7.2- Creamos la ruta 'Profile' para brand:
router.get("/profile/:id", check.auth, BrandController.profile);
//2.8.2-Ruta de Update brand:
router.put("/update/:id", check.auth, BrandController.updateBrand);
//2.9.2-Ruta de borrar brand:
router.delete("/delete/:id", check.auth, BrandController.deleteBrand);


module.exports = router;