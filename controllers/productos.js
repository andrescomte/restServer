const { response } = require("express");
const {Producto, Categoria} = require('../models');

const productosGet = async(req,res = response) =>{


    const {limit = 5,desde=0} = req.query;
    const query = {estado:true};
    const [total,categorias] = await Promise.all([
        Producto.count(query),
        Producto.find(query).populate('usuario','nombre').populate('categoria','nombre').skip(Number(desde)).limit(Number(limit))
    ]);
    res.json({
        total,
        categorias
    })

}

const productosGetById = async(req,res = response) =>{
    
    const {id} = req.params;

    const producto = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre')

    res.json({
        producto
    })
}

const updateProducto = async(req,res = response) =>{

    const {id} = req.params;
    const {estado,usuario,...data} = req.body
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.userAuth._id

    //ver si el estado de mi categoria esta OK


    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});
    res.json(
        producto
    )

}

const crearProducto = async(req,res=response) =>{

    const {nombre,categoria,...dataBody} = req.body

    const productodb = await Producto.findOne({nombre});
    const categoriaDB = await Categoria.findOne({nombre:categoria.toUpperCase()});

    if(productodb){
        return res.status(400).json({
            msg:`La producto ${productodb.nombre} ya existe`
        })
    }
    if(!categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoria} no existe`
        });
    }

    //generar la data a guardar
    const data = {
        nombre,
        usuario: req.userAuth._id,
        categoria: categoriaDB._id,
        ...dataBody
    }

    const producto = new Producto(data);
    await producto.save();

    res.status(201).json(producto)
}
const deleteProducto = async(req,res=response) =>{

    const {id} = req.params

    const producto = await Producto.findByIdAndUpdate(id,{estado:false},{new:true})

    res.json({
        id,
        producto
    })

}

module.exports={
    crearProducto,
    productosGet,
    productosGetById,
    updateProducto,
    deleteProducto
}

