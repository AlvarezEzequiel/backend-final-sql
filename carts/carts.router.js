const express  = require('express')
const { postCartController, getCartController, deleteProductFromCartController } = require('./carts.controller')

const { verifyTokenMiddleware } = require('../auth/auth.middleware')

const cartsRouter = express.Router()

cartsRouter.get('/', verifyTokenMiddleware, getCartController)


cartsRouter.post('/', verifyTokenMiddleware, postCartController)


cartsRouter.delete('/:product_id', verifyTokenMiddleware, deleteProductFromCartController)

module.exports = {cartsRouter}