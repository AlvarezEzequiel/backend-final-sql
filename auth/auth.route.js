const express = require ('express')
const {loginControler, registerController, verifyTokenController} = require ('./auth.controller')
const authRouter = express.Router()




authRouter.post('/login', loginControler)
authRouter.post('/register', registerController)
authRouter.get('/verify-token', verifyTokenController)


module.exports = {authRouter}