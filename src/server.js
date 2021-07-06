import dotenv from "dotenv"
import express from "express"
import productsRouter from "./services/products/index.js"

// if (process.env.NODE_ENV !== "production") {
dotenv.config()
// }
console.log(process.env.NODE_ENV)

const server = new express()

server.use(express.json())

const testRouter = express.Router()

testRouter.get('/', (req, res) => {
    res.status(200).send({ text: "Test success" })
})

server.use('/test', testRouter)
server.use('/products', productsRouter)


export default server