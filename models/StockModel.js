//2.1.8 -Definimos el Model de Stock:
const {Schema, model} = require('mongoose');

const StockSchema = Schema({
    ref: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    genere: {
        type: Schema.Types.ObjectId,
        ref: 'Genere',
        required: false,
    },
    season: {
        type: Schema.Types.ObjectId,
        ref: 'Season',
        required: true,
    },
    productType: {
        type: Schema.Types.ObjectId,
        ref: 'ProductType',
        required: true,
    },
    itemStatus: {
        type: Schema.Types.ObjectId,
        ref: 'itemStatus',
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    sizeShoes: {
        type: Schema.Types.ObjectId,
        ref: 'SizeShoes',
        required: false,
    },
    sizeCloth: {
        type: Schema.Types.ObjectId,
        ref: 'SizeCloth',
        required: false,
    },
    color: {
        type: String,
        required: false,
    },
    pictures:{
        type: String,
        required: false,
    },
    buyDate: {
        type: Date,
        required: false,
    },
    buy_price: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    itemStored: {
        type: String,
        required: false,
        enum: [
            'partnerStock', 
            'ourstock'
        ], 
        default: 'ourStock'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
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


module.exports = model('Stock', StockSchema, 'stocks');