//2.1.5 -Definimos el Model de SizeShoes:
const {Schema, model} = require('mongoose');

const SizeClothSchema = Schema({
    name: {
        type: String,
        required: true
    },
    sizeCloth: {
        type: String,
        required: true,
        sizingType: {
            universal: {
                enum: [
                    'XXS',
                    'XS', 
                    'S',
                    'M',
                    'L',
                    'XL',
                    'XXL'
                ]
            },
            european: {
                enum: [
                    '< 30',
                    '32-34', 
                    '36-38',
                    '40-42',
                    '44-46',
                    '48-50',
                    '52-54',
                    '56 <'
                ]
            },
        },
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

module.exports = model('SizeCloth', SizeClothSchema, 'sizeCloth');