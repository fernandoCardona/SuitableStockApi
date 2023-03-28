//Importamos dependencias:
const { Router } = require('express');
//Importamos Model UserModel:
const User = require('../models/UserModel');
const UserController = require('../controllers/userController');
const check = require('../middlewares/auth');
const multer = require('multer');

//4.1.0- Creamos la variable de la funcion Router:
const router = Router();

//Configuracion de subida de archivos:
const storage = multer.diskStorage({
    destination: (req, file, cd ) => {
        cd ( null, './upload/avatars/' );
    },
    filename:  (req, file, cb) => {
        cb( null, 'avatar-' + Date.now() + '-' + file.originalname );
    }
});

const uploads = multer({ storage});

//2.2.2- CREAMOS LAS RUTAS PARA LOS SERVICIOS DEL MODELO USER::
//4.2.1-Ruta de creacion de un nuevo usuario:
// router.post('/', async(req, res) => {
//     const params=req.body;
//     console.log(params);
//     try {
//         console.log(req.body);
//         //creamos una instancia del nuevo usuario:
//         let user = new User();
//         user.name = req.body.name;
//         user.surname = req.body.surname;
//         user.email = req.body.email;
//         user.password = req.body.password;
//         user.userRole = req.body.userRole;
//         user.userStatus = req.body.userStatus;
//         user.createDate = new Date();
//         user.updateDate = new Date();

//         //Guardamos el user en la db;
//         user = await user.save();
//         res.send(user);

//     } catch (error) {
//         console.log(error)
//         res.send('ocurrio un error')
//     }
    
// });
router.post("/register", UserController.register);
//2.3.2- Creamos la ruta 'login' para user:
router.post("/login", UserController.login);
//2.4.2- Creamos la ruta 'usersList' para user:
router.get("/userList/:page?", check.auth, UserController.usersList);
//2.5.2- Creamos la ruta 'userUpload' para user:
router.post("/uploadAvatar", [check.auth, uploads.single('file0')], UserController.userUploadAvatar);
//2.6.2- Creamos la ruta 'userShowAvatar' para user:
router.get("/avatar/:file", UserController.userShowAvatar);
//2.7.2- Creamos la ruta 'userProfile' para user:
router.get("/profile/:id", check.auth, UserController.profile);
//2.8.2- Creamos la ruta 'userUpdate' para user:
router.put("/update", check.auth, UserController.update);
//2.9.2-Ruta de borrar usuario:
router.delete("/delete/:id", check.auth,  UserController.deleteUser);

//4.2.2-Ruta de ver usuario:
 router.get('/', (req, res) => {
     res.send('Hola mundo estoy en la ruta ver usuario');
});
//4.2.3-Ruta de ruta actualizar usuario:
// router.put('/', (req, res) => {
//     res.send('Hola mundo estoy en la ruta actualizar usuario');
// });



module.exports = router;