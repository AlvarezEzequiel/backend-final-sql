const { insertarProducto, seleccionarProductoPorId, borrarProducroPorId, seleccionarProductos } = require("./products.repository")
const { validarPropiedadesProducto } = require("./utils/validarProducto")




const crearProducto = async (producto) => {
    try{
        const pasoValidacion =validarPropiedadesProducto(producto)
        
        if(pasoValidacion){
            
            const idProductoCreado = await insertarProducto(producto)
            return {ok: true, message: `Producto creado con exito con id ${idProductoCreado} `, idProductoCreado: idProductoCreado}
        }
        else{
            throw{status:400, message: 'Error Exception: no se pasaron las validaciones del producto'}
        }
    }    
    catch(error){
        if(error.status){
            throw error
        }
        else{
            throw {status: 500, message: 'Error interno del servidor'}
        } 
    }
}

const selectProductById = async (pid) => {
    try{
        const producto = await seleccionarProductoPorId(pid)
            return {ok: true, status: 200, message: 'Producto obtenido', producto}
    }
    catch(error){
        if(error.status){
            throw error
        }
        else{
            throw {status: 500, message: 'Error interno del servidor'}
        }
    }
}

const deleteProductById = async (pid) => {
    try{
        const result = await borrarProducroPorId(pid)
        if (result.affectedRows === 0) {
            throw {status: 404, message: 'No se encontro el producto'}
        }
        return {ok: true , status: 200, message: `Producto con id ${pid} eliminado correctamente`, result}
         }
    catch(error){
        if(error.status){
            throw error
        }
        else{
            throw {status: 500, message: 'Error interno del servidor'}
        }
    }
}


 const searchProducts = async (page, limit) => {
     try{
        const { products, totalPages } = await seleccionarProductos(page, limit)
         if(products.length === 0){
             throw {status: 404, message: 'No hay productos'}
         }
         return {ok: true, status: 200, message: 'productos obtenidos con exito: ', products ,totalPages}
     }
     catch(error){
         if(error.status){
        throw error
         }   
         throw { status: 500, message: 'Error al buscar productos', error }
     }
 }
 module.exports = {crearProducto, selectProductById, deleteProductById, searchProducts}



 