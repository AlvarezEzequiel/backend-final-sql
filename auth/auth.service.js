const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { buscarUsuarioPorEmail, insertarUsuario } = require("./auth.repository")
const { validacionUsuario } = require('./utils/validationUser.util')




const registerService = async (usuario) => {
    try {
        const { email, password } = usuario;

        validacionUsuario({ email, password });

        const usuarioExistente = await buscarUsuarioPorEmail(usuario.email);

        if (usuarioExistente) {
            throw { status: 400, message: 'El usuario con el email ingresado ya existe' };
        }

        const passwordHash = await bcrypt.hash(usuario.password, 10);
        const result = await insertarUsuario({ email: usuario.email, password: passwordHash });

        if (result) {
            return { ok: true, message: 'Usuario registrado con éxito' };
        }

    } catch (error) {
        console.log(error);
        if (error.status) {
            throw error;
        } else {
            throw { status: 500, message: 'Error interno del servidor' };
        }
    }
};


const loginService = async (usuario) => {
    try {
        const { email, password } = usuario;

        validacionUsuario(usuario);
        const usuarioExistente = await buscarUsuarioPorEmail(usuario.email);
        if (!usuarioExistente) {
            throw { status: 400, message: 'El email no está registrado' };
        }
        const esCorrecta = await bcrypt.compare(password, usuarioExistente.password);
        if (!esCorrecta) {
            throw { status: 400, message: 'La contraseña es incorrecta' };
        } else {
            const token = jwt.sign({ email, user_id: usuarioExistente.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
            return { token, message: 'Inicio de sesión exitoso' };
        }
    } catch (error) {
        if (error.status) {
            throw error;
        } else {
            throw { status: 500, message: 'Error interno del servidor' };
        }
    }
};



module.exports = { registerService, loginService}