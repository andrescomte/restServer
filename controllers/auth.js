
const bcryptjs = require('bcryptjs');
const {response} = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');




const login = async(req,res = response) =>{

    const {correo,password} = req.body;

    try {


        //verificar si el mail existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - email"
            })
        }
        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - estado:false"
            })
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg:"Usuario / Password no son correctos - Invalid Password"
            })

        }

        //generar el JWT
        const token = await generarJWT(usuario.id)


        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Hable con el administrador"
        })
        
    }
}

module.exports = {
    login
}