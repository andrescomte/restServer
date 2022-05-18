const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlerwares/validar-campos');

const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','El password es obligatoria').not().isEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('id_token','Id_token es necesario').not().isEmpty(),
    validarCampos
],googleSignIn);

module.exports =router;