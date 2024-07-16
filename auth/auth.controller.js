const { registerService, loginService } = require("./auth.service")
const jwt = require('jsonwebtoken')
const {validacionExistencia} = require('../helpers/validation.helper')

const loginControler = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { token, message } = await loginService({ email, password });
        res.status(200).json({ ok: true, message, token });
    } catch (error) {
        res.status(error.status).json({ ok: false, message: error.message });
    }
};


const registerController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await registerService({ email, password });
        res.status(200).json({ ok: true, message: result.message });
    } catch (error) {
        res.status(error.status).json({ ok: false, message: error.message });
    }
};


const verifyTokenController = (req, res) => {
    const token = req.headers['authorization']

    if(!validacionExistencia(token) || 
        !isNaN(token) || 
        token === 'null' || 
        token === 'undefined'){
        res.status(401).res.json({status: 401, ok: false, message: 'Debes proporcionar un token valido'})
    }
    const esValido = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if(!esValido){
        res.status(401).res.json({status: 401, ok: false, message: 'Unauthorized, Token invalido'})
    }
    else{
        res.status(200).json({status: 200, ok: true, message: 'Authorized, token valido'})
    }
}


module.exports = {loginControler, registerController, verifyTokenController}