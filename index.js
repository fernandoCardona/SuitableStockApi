//Importamos dependencias:
const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');
const cors = require('cors');
//3.1.1 Implementamos la variable de express para crear un servidor web: 
const app = express();
//3.1.2- Creamosla variable con el port atraves del cual escucha las peticiones la Api:
const port = 3100;

//1.1.1- Hacemos la llamada a la db.
getConnection();
app.use(cors());
//Middleware para enviar parseada informacion JSON a la api:
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//3.1.3- Creacion de EJEMPLO DE ENDPOINS para las peticiones de servicios USER:
//USER:
app.use('/user', require('./router/userRoutes'));
//BRAND:
app.use('/brand', require('./router/brandRoutes'));
//GENERE:
app.use('/genere', require('./router/genereRoutes'));
//ITEMSTATUS:
//app.use('/itemStored', require('./router/itemStoredRoutes'));
//PRODUCTTYPE:
app.use('/productType', require('./router/productTypeRoutes'));
//SIZECLOTH:
//app.use('/sizeCloth', require('./router/sizeClothRoutes'));
//SIZESHOES:
//app.use('/sizeShoes', require('./router/sizeShoesRoutes'));
//SEASON:
//app.use('/season', require('./router/seasonRoutes'));
//STOCK:
app.use('/stock', require('./router/stockRoutes'));


//3.1.4- Creaamos un listenes atraves del cual la api esta escuchando las peticiones:
app.listen( port, () => {
    console.log(`Exemple app listening on port ${port}`);
});


