//2.1.2 -Definimos el Model de ProductType:
const {Schema, model} = require('mongoose');

const ProductTypeSchema = Schema({
    name: {
        type: String,
        required: true
    },
    productTypeStatus: {
        type: String,
        required: false,
        enum: [
            'active', 
            'inactive'
        ]
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

module.exports = model('ProductType', ProductTypeSchema, 'productType');