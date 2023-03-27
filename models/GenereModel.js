//2.1.7 -Definimos el Model de Brand:
const {Schema, model} = require('mongoose');

const GenereSchema = Schema({
    name: {
        type: String,
        required: true
    },
    genereStatus: {
        type: String,
        required: true,
        enum: [
            'active', 
            'inactive'
        ],
        default: 'active'
    },
    createDate: {
        type: Date,
        equired: true,
    },
    updateDate: {
        type: Date,
        equired: true,
    }
});

module.exports = model('Genere', GenereSchema, 'genere');