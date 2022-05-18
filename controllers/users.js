
const{response} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const userGet= async(req,res=response) =>{

    //const {q,nombre ="no name",apiKey} = req.query;
    const {limit=5,desde=5} = req.query
    const query = {estado:true};
    const [total,usuarios] = await Promise.all([ //para ejecutar de manera paralela las promesas sin necesida de esperar y tener mucho tiempo de espera
        Usuario.count(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limit))

    ]);
    res.json({
        total,
        usuarios
    })
}

const userPost = async(req,res=response) =>{   

    const {nombre,correo,password,rol} = req.body;

    const usuario = new Usuario({nombre,correo,password,rol});

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    //guardar en la BD
    await usuario.save();

    res.json({
        msg: "Post API - Controller",
        usuario
    })
}
const userDelete = async(req,res=response) =>{
    const {id} = req.params;

    // const uid = req.uid

    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado : false})
    res.json({
        usuario
    })
}
const userPut = async(req,res=response) =>{

    const {_id,password,google,correo, ...resto} = req.body

    const {id} = req.params;

    //TODO validar con base de datos.

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);

    }
    const usuario = await Usuario.findByIdAndUpdate(id,resto);
    res.json({
        msg: "Put API - Controller",
        id,
        usuario
    })
}
module.exports = {
    userGet,
    userDelete,
    userPost,
    userPut
}