const { validacionExistencia, validacionEmail } = require("../../helpers/validation.helper")

const validacionUsuario = (usuario) => {
    if (!validacionExistencia(usuario.email)){
        throw { status: 400, message: 'Inexistent email' }
    } 
    if(!validacionExistencia(usuario.password)) {
        throw { status: 400, message: 'Inexistent password' }
    
    }
    if(!validacionEmail(usuario.email)) {
        throw {message: 'Email incorrecto', status: 400}
    }
}

module.exports = {validacionUsuario}