const {Router} = require('express');
const { check } = require('express-validator');
const {
    validarCampos,
    validarJWT,
    tieneRol
} = require('../middlerwares');
const { response } = require('express');
const { existeProducto } = require('../helpers/db-validators');
const { crearProducto, productosGet, productosGetById, updateProducto, deleteProducto } = require('../controllers/productos');

const router = Router();


router.get('/',productosGet);

router.get('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],productosGetById);

router.post('/',[
    validarJWT,
    validarCampos
],crearProducto);

router.put('/:id',[
    validarJWT,
    tieneRol('ADMIN_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('nombre','Se requiere un nombre').not().isEmpty(),
    check('id').custom(existeProducto),
    validarCampos
],updateProducto);

router.delete('/:id',[
    validarJWT,
    tieneRol('ADMIN_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
],deleteProducto);



module.exports=router