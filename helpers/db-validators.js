const Role = require('../models/rol');
const Usuario = require('../models/usuario');


 const esRolValido = async(rol='') => {
    const existeRol = await Role.findOne({rol});
    if( !existeRol ){
        throw new Error(`El rol ${rol} no esta regristado en la BD`)
    }

}
const existeEmail = async(correo='') =>{
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail){
        throw new Error(`El main ${correo} ya esta registrado`)
    }
}

const existeUsuarioPorId = async(id) =>{
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario){
        throw new Error(`El id no existe ${id}`)
    }
}

    

module.exports={
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}