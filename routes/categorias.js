const {Router} = require('express');
const { check } = require('express-validator');
const {
    validarCampos,
    validarJWT,
    tieneRol
} = require('../middlerwares');
const {crearCategoria, categoriasGet, categoriaById, updateCategoria, deleteCategoria} = require('../controllers/categorias');
const { response } = require('express');
const { existeCategoria } = require('../helpers/db-validators');

const router = Router();

// {{url}}/api/categorias

//validar ID de categoria check('id).custom(existeCategoria)

//obtener todas las categorias - publico
router.get('/',categoriasGet);

//obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],categoriaById);


//crear una nueva categoria - private - cualquier rol, con token valido
router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);


//actualizar un registro por un id de moongo - privado - token valido
router.put('/:id',[
    validarJWT,
    tieneRol('ADMIN_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('nombre','Se requiere un nombre').not().isEmpty(),
    check('id').custom(existeCategoria),
    validarCampos
],updateCategoria);

//borrar una categoria - Admin
router.delete('/:id',[
    validarJWT,
    tieneRol('ADMIN_ROLE'),
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
],deleteCategoria);

module.exports = router;
