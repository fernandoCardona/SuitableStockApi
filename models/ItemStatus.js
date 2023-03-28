ProductStatus

//2.1.7 -Definimos el Model de ProductStatus:
const {Schema, model} = require('mongoose');

const ItemStatusSchema = Schema({
    name: {
        type: String,
        required: true
    },
    itemStatus: {
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

module.exports = model('ItemStatus', ItemStatusSchema, 'itemStatus');