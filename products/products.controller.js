

const { seleccionarProductoPorId } = require('./products.repository')
const {crearProducto, deleteProductById, searchProducts} = require('./products.service')


const postProductController = async (req, res) => {  
    try{
        const result = await crearProducto(req.body)
        res.status(200).json(result)
    }
    catch(error){
        res.status(error.status).json(error)
    }
    
}

const getProductByIdController = async (req, res) => {
    try{
        const {pid} = req.params
        
        if(!(pid && !isNaN(pid))){
            throw {status: 400, message: 'El parametro pid debe ser un valor numerico  valido'}
        }
        const result = await seleccionarProductoPorId(pid)
        res.status(200).json({ producto: result })
        
        
    }
    catch(error){
        res.status(error.status).json(error)
    }
}    

const updateProductController = async (req, res) => {
    const { pid } = req.params;
    const { titulo, precio } = req.body;
  
    try {
      const product = await updateProductById(pid, { titulo, precio });
      if (!product) {
        return res.status(404).json({ message: `Producto con id ${pid} no existe` });
      }
      res.json({ message: 'Producto actualizado con éxito', product });
    } catch (error) {
      res.status(500).json({ message: 'Error actualizando el producto', error });
    }
  }

const deleteProductByIdController = async (req, res) => {
    try{
        const {pid} = req.params
        if(!(pid && !isNaN(pid))){
            throw {status: 400, message: 'El parametro pid debe ser un valor numerico  valido'}
        }
        const result = await deleteProductById(pid)
        res.status(200).json({ message: `Producto con id ${pid} eliminado correctamente`, status: 200 });
    }
    catch(error){
        res.status(error.status).json({ error });
    }
}


 const getAllProductsController = async (req, res) => {
     try{
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const { products, totalPages } = await searchProducts(page, limit);
      
        res.json({ data: products, totalPages });
      } 
      catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
      }
    
 }

module.exports = {postProductController, getProductByIdController, deleteProductByIdController, getAllProductsController, updateProductController}