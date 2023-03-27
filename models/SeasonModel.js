//2.1.6 -Definimos el Model de Brand:
const {Schema, model} = require('mongoose');

const SeasonSchema = Schema({
    year: {
        type: String,
        required: true
    },
    season: {
        type: String,
        enum: [
            'Spring', 
            'Summer',
            'Autumn',
            'Winter',
            'All seasons'
        ],
        required: false
    }
});

module.exports = model('Season', SeasonSchema, 'season');