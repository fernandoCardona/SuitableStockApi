//2.1.1 -Definimos el Model de Brand:
const {Schema, model} = require('mongoose');

const BrandSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    brandTarget: {
        type: String,
        required: true,
        enum: [
            'man', 
            'woman',
            'kid',
            'girl',
            'unisex'
        ], 
        default: 'unisex'
    },
    brandMarket: {
        type: String,
        required: true,
        enum: [
            'skateboard', 
            'snowboard',
            'streetwear',
            'surf',
            'others'
        ], 
        default: 'unisex'
    },
    brandStatus: {
        type: String,
        required: true,
        enum: [
            'active', 
            'inactive'
        ], 
        default: 'active'
    },
    logo: {
        type: String,
        default: 'default.png'
    },
    createDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    updateDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = model('Brand', BrandSchema, 'brand');