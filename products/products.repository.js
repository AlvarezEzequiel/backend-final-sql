const { query } = require("../config/connection.sql")


const insertarProducto = async ({titulo, descripcion, stock, precio, codigo}) => {
    try{
        const queryString = 'INSERT INTO productos (titulo, descripcion, stock, precio, codigo) VALUES (?, ?, ?, ?, ?)'
        const valores = [titulo, descripcion, stock, precio, codigo]
        const result = await query(queryString, valores)
        return result.insertId
    }
    catch(error){
        throw {status: 500, message: 'Error interno del servidor'}
    }
}

const seleccionarProductoPorId = async (pid) => {
    try{
        const queryString = 'SELECT * FROM productos WHERE id = ?'
        const result = await query(queryString, [pid])
        if(result.length === 0){
            throw {status: 404, message: 'No se encontro el producto con id: ' + pid}
        }
        else{
            return result[0]
        }
    }
    catch(error){
        if(error.status === 404){
            throw error
        }
        else{
        throw {status: 500, message: 'Error interno del servidor'}
        }
    }     
}



const seleccionarProductos = async (page, limit) => {
  const offset = (page - 1) * limit;
  
  const products = await query('SELECT * FROM productos LIMIT ?, ?', [offset, limit]);
  const [{ count }] = await query('SELECT COUNT(*) as count FROM productos');
  
  const totalPages = Math.ceil(count / limit);
  
  return { products, totalPages };
}


const updateProductById = async (id, data) => {
    const { titulo, precio } = data;
    const [result] = await query('UPDATE productos SET titulo = ?, precio = ? WHERE id = ?', [titulo, precio, id]);
    
    if (result.affectedRows === 0) {
      return null
    }
  
   
    const [updatedProduct] = await query('SELECT * FROM productos WHERE id = ?', [id]);
    return updatedProduct
  }


const borrarProducroPorId = async (pid) => {
    try{
        const queryString = 'DELETE FROM productos WHERE id = ?'
        const result = await query(queryString, [pid])
        if(result.length === 0){
            throw {status: 404, message: 'No se encontro el producto con id: ' + pid}
        }
        else{
            return {status: 200, message: 'Producto con id ' + pid + ' eliminado correctamente', affectedRows: result.affectedRows}
        }
    }
    catch(error){
        if(error === 404){
            throw error
        }
        else{
            throw {status: 500, message: 'Error interno del servidor'}
        }
    }
}

module.exports = { insertarProducto, seleccionarProductoPorId, borrarProducroPorId, seleccionarProductos, updateProductById}