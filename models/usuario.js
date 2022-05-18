const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        requied:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        requied:[true,'El correo es obligatorio'],
        unique: true
    },
    password:{
        type:String,
        requied:[true,'La Contraseña es obligatorio']
    },
    img:{
        type:String,
    },
    rol:{
        type:String,
        required : true,
        emun :['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type:Boolean,
        default: true
    },
    google:{
        type:Boolean,
        default: false
    }


})

UsuarioSchema.methods.toJSON = function(){
    const {__v,password,_id,...user} = this.toObject();
    user.uid = _id;
    return user
}

module.exports = model('Usuario',UsuarioSchema);