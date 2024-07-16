const { query } = require("../config/connection.sql")



const buscarUsuarioPorEmail = async (email) => {
    try{
        const consultaExistencia = "SELECT * FROM usuarios WHERE email = ?"
        const resultados = await query(consultaExistencia, [email])
        if(resultados.length > 0){
            console.log(resultados)
            return resultados[0]
        }
        else{
            return null
        }
    }
    catch(error){
        console.error('SQL_Error al intentar seleccionar un usuario por email', error);
        throw {status: 500, message: 'Error al buscar usuario'}
    }
}


const insertarUsuario = async (usuario) => {
    try{
        const queryString = "INSERT INTO usuarios SET ?"
        console.log({usuario})
        const resultado = await query(queryString, usuario)
            return true
        }
    catch(error){
        throw{status: 500, message: 'Error al insertar usuario'}
    }
}

    



 


module.exports = {buscarUsuarioPorEmail, insertarUsuario}