
const {Router} = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    tieneRol
} = require('../middlerwares');

const {esRolValido, existeEmail, existeUsuarioPorId} = require('../helpers/db-validators');

const { userGet, userPost, userPut, userDelete } = require('../controllers/users');
const router = Router();

router.get('/',userGet);

router.post('/',[
    check('correo','El correo no es valido').isEmail(),
    check('password','El password debe de ser mas de 6 letras ').isLength({min:6}),
    check('nombre','El nombre no es valido').not().isEmpty(),
    check('correo').custom(existeEmail),
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido), //primer argumento que recibe custom entra a la funcion
    validarCampos
],userPost);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido), //primer argumento que recibe custom entra a la funcion

    validarCampos
],userPut);

router.delete('/:id',[
    validarJWT,
    //tieneRol('ADMIN_ROLE'),
    //esAdminRole,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],userDelete);


module.exports = router

