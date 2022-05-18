const { response } = require("express");
const jwt = require('jsonwebtoken');
const usuario = require("../models/usuario");
const Usuario = require("../models/usuario");


const validarJWT = async(req,res = response,next) =>{
    
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:"No hay token en la peticion"
        });
    }

    try {
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        //leer el usuario que corresponde al uid

        const userAuth = await Usuario.findById(uid)

        if(!userAuth){
            return res.status(401).json({
                msg:"Token no valido - userAuth no existe en DB"
            })

        }

        //verificar si el uid tiene estado true
        if(!userAuth.estado){
            return res.status(401).json({
                msg:"Token no valido - userAuth estado:false"
            })
        }

        req.uid = uid
        req.userAuth = userAuth
        next();

    } catch (error) {
        return res.status(401).json({
            msg:"Token no valido"
        })
        
    }
    console.log(token);
    next();
}

module.exports = {
    validarJWT
}