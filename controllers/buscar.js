const { response } = require("express");
const {ObjectId} = require('mongoose').Types
const { Usuario,Categoria,Producto} = require('../models')

const coleccionPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'productos-categoria'
];

const buscarUsuarios = async(termino='', res = response) =>{

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })

    }

    const regex = new RegExp(termino,'i');

    const usuarios = await Usuario.find({
        $or: [{nombre: regex},{correo: regex}],
        $and:[{estado:true}]
    });

    res.json({
        results : usuarios

    })
}

const buscarCategoria = async(termino='', res = response) =>{

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino,'i');

    const categorias = await Categoria.find({
        $or: [{nombre: regex}],
        $and:[{estado:true}]
    });

    res.json({
        results : categorias
    })
}
const buscarProductos = async(termino='', res = response) =>{

    const esMongoId = ObjectId.isValid(termino);

    if(esMongoId){
        const producto = await Producto.findById(termino).populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino,'i');

    const productos = await Producto.find({
        $or: [{nombre: regex}],
        $and:[{estado:true}]
    }).populate('categoria','nombre');

    res.json({
        results : productos
    })
}

const searchProductByCategory = async(termino = '',res = response) =>{

    const esMongoId = ObjectId.isValid(termino);
    if(esMongoId){
        const producto = await Producto
        .find({categoria: ObjectId(termino), estado:true})
        .populate('categoria','nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino,'i');

    const categoria = await Categoria.find({nombre:regex, estado:true})

    if(!categoria.length){
        return res.status(400).json({
            msg:`No existe resultado para esta categoria ${termino} `
        })
    }

    const productos = await Producto.find({
        $or : [...categoria.map(cat =>{
            return {categoria: cat._id}
        })],
        $and: [{estado : true}]
    })
    .populate('categoria','nombre');

    res.json({
        productos
    })

}



const buscar = async(req,res=response) =>{

    const {coleccion,termino } = req.params;

    if(!coleccionPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son ${coleccionPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino,res);
            
            break;
        case 'categoria':
            buscarCategoria(termino,res)
            
            break;
        case 'productos':
            buscarProductos(termino,res)
            
            break;
        case 'productos-categoria':
            searchProductByCategory(termino,res);
            
            break;
    
        default:
            res.status(500).json({
                msg:"se te olvido hacer esta busqueda"
            })
    }

}

module.exports = {
    buscar
}