const express = require('express')

const { postProductController, getProductByIdController, deleteProductByIdController, getAllProductsController, updateProductController } = require('./products.controller')

const productRouter = express.Router()
/*
TODO: Agregar el midleware de verificacion de token*/



productRouter.get('/', getAllProductsController)
productRouter.post('/', postProductController)
productRouter.get('/:pid', getProductByIdController)
productRouter.put('/:pid', updateProductController)
productRouter.delete('/:pid', deleteProductByIdController)



module.exports = {productRouter}