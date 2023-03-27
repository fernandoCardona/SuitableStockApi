//Importamos dependencias:
const express = require('express');
const { getConnection } = require('./db/db-connection-mongo');
const cors = require('cors');
//3.1.1 Implementamos la variable de express para crear un servidor web: 
const app = express();
//3.1.2- Creamosla variable con el port atraves del cual escucha las peticiones la Api:
const port = 3000;

//1.1.1- Hacemos la llamada a la db.
getConnection();
app.use(cors());