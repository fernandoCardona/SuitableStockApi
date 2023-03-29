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
        type: String,
        enum: [
            'Winter season', 
            'Spring season',
            'Summer season',
            'Fall season',
            'All season'
        ],
        default: 'All season'
    },
    productType: {
        type: Schema.Types.ObjectId,
        ref: 'ProductType',
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
    itemQuantity: {
        type: Number,
        required: true,
    },
    itemStored: {
        type: String,
        required: false,
        enum: [
            'partnerWareHouse', 
            'ourWareHouse'
        ], 
        default: 'ourWareHouse'
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