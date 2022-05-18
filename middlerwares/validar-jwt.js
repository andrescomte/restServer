const { request } = require("express");
const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/usuario");


const validarJWT = async(req = request,res = response,next) =>{
    
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

        req.userAuth = userAuth
        next();

    } catch (error) {
        res.status(401).json({
            msg:"Token no valido"
        })
        
    }
}

module.exports = {
    validarJWT
}