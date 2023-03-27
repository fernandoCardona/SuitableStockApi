//Importamos dependencias:
require('dotenv').config()
const mongoose = require('mongoose');

console.log (process.env.MONGO_CONNECT_APLICATION)

//1.0.0- Creamos conexion a la db:
const getConnection = async() => {
    try {
        const url = process.env.MONGO_CONNECT_APLICATION;

        await mongoose.connect(url)
                .then(() => console.log('Connected!'));
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { 
    getConnection
}