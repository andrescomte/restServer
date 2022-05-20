const { response } = require("express");
const {Categoria} = require('../models');


// Obtener categorias --paginado--total--populate(relacionar tablas)
const categoriasGet = async(req,res=response) =>{

    const {limit = 5,desde=0} = req.query;
    const query = {estado:true};
    const [total,categorias] = await Promise.all([
        Categoria.count(query),
        Categoria.find(query).populate('usuario','nombre').skip(Number(desde)).limit(Number(limit))
    ]);

    res.json({
        total,
        categorias
    })

}
//obtener categorias-- populate()

const categoriaById = async(req,res=response) =>{

    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate('usuario','nombre')

    res.json({
        categoria
    })
}

const crearCategoria = async(req,res=response) =>{

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if(categoriaDB){
        return res.status(400).json({
            msg:`La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    //generar la data a guardar
    const data = {
        nombre,
        usuario: req.userAuth._id
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json(categoria)
}

//actuaizar categorias --- nombre

const updateCategoria = async(req,res = response) =>{

    const {id} = req.params;
    const {estado,usuario,...data} = req.body
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.userAuth._id

    //ver si el estado de mi categoria esta OK


    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true});
    res.json(
        categoria
    )




}

//borrar categoria-- cambiar estado a false

const deleteCategoria = async(req,res=response) =>{

    const {id} = req.params

    const categoria = await Categoria.findByIdAndUpdate(id,{estado:false},{new:true})

    res.json({
        id,
        categoria
    })

}

module.exports = {
    crearCategoria,
    categoriasGet,
    categoriaById,
    updateCategoria,
    deleteCategoria
}