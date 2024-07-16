const mysql = require ('mysql')
const util = require ('util')


const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_USERNAME = process.env.DB_USERNAME || 'root'



const userSettings = {
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME
}

const database = mysql.createConnection(userSettings)
const query = util.promisify(database.query).bind(database)

database.connect((error) => {
    if(error){
        console.error('Error de conecion', error)
    }else{
        console.log('coneccion exitosa a la base de datos')
    }
})

module.exports = {database, query}