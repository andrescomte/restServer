const { response } = require("express")

const esAdminRole = (req,res = response,next) =>{


    if(!req.userAuth){
        return res.status(500).json({
            msg:"Se quiere verificar el rol sin verificar el token primero"
        });
    }

    const {rol,nombre} = req.userAuth

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador`
        });
    }

    next();
}

const tieneRol = (...roles) =>{
    return (req,res=response,next) =>{
        if(!req.userAuth){
            return res.status(500).json({
                msg: "se requiere verificar el role sin validar el token primero"
            })
        }
        if(!roles.includes(req.userAuth.rol)){
            return res.status(401).json({
                msg:`El servicio requiere uno de estos roles ${roles}`
            })

        }
        next();
    }

}
module.exports = {
    esAdminRole,
    tieneRol
}