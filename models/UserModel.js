//2.1.0 -Definimos el Model de user:
const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarImg: {
        type: String,
        default: 'default.png'
    },
    userRole: {
        type: String,
        enum: [
            'role_user', 
            'admin_role'
        ],
        default: 'role_user'
    },
    userStatus: {
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
        required: true,
        default: new Date()
    },
    updateDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = model('User', UserSchema, 'users');