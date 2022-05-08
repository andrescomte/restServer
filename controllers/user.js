
const{response} = require('express')

const userGet= (req,res=response) =>{

    const {q,nombre ="no name",apiKey} = req.query;
    res.json({
        msg: "put API Controlador",
        q,
        nombre,
        apiKey
    })
}

const userPost = (req,res=response) =>{

    const body = req.body;

    res.json({
        msg: "Post API - Controller",
        body
    })
}
const userDelete = (req,res=response) =>{
    res.json({
        msg: "Delete API - Controller"
    })
}
const userPut = (req,res=response) =>{

    const {id} = req.params;
    res.json({
        msg: "Put API - Controller",
        id
    })
}
module.exports = {
    userGet,
    userDelete,
    userPost,
    userPut
}