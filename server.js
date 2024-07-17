const express = require ('express')
const dotenv = require ('dotenv')
const cors = require ('cors')
dotenv.config()

const { authRouter } = require('./auth/auth.route')
const { productRouter } = require('./products/products.router')
const { cartsRouter } = require('./carts/carts.router')






const PORT = process.env.PORT || 4040
const app = express()

app.use(cors())
app.use(express.json())

app.get('/test', (req, res) => {
    res.json({status: 200, message: 'Hello World'})
})

app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)



app.listen( PORT, () => {
    console.log( 'Server running on port ' + PORT)
} )

