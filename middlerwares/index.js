

const validarCampos  = require('../middlerwares/validar-campos');
const validarJWT  = require('../middlerwares/validar-jwt');
const tieneRol = require('../middlerwares/validar-rol');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...tieneRol
}
