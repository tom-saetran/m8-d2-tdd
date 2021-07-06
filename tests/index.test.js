import supertest from "supertest"
import server from "../src/server.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const request = supertest(server)

beforeAll(done => {
    console.log(process.env.MONGO_DB)

    mongoose.connect(process.env.MONGO_DB + "/test", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Successfully connected to Atlas!")
        done()
    })
})

afterAll(done => {
    mongoose.connection.dropDatabase(() => {
        mongoose.connection.close(() => {
            console.log("Closed connection to Atlas!")

            done()
        })
    })
})

describe("Testing test environment", () => {
    it("should check that true is true", () => {
        expect(true).toBe(true)
    })

    it("should check that our test enpdoint is working", async () => {
        const response = await request.get("/test")

        expect(response.status).toBe(200)
        expect(response.body.text).toBe("Test success")
    })
})

describe("Testing endpoints", () => {
    it("should test that our products are correctly retrieved", async () => {
        const response = await request.get("/products")

        expect(response.status).toBe(200)
        expect(response.body.products).toBeDefined()
    })

    const validProduct = {
        name: "iPhone XS",
        price: 899
    }

    it("should test that when adding one product we are able to retrieve it right away", async () => {
        const response = await request.post("/products").send(validProduct)

        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()

        const _response = await request.get("/products/" + response.body._id)

        expect(_response.body.name).toEqual(validProduct.name)
    })

    const invalidProduct = {
        price: 899
    }

    it("should test that when adding one product with INVALID data we are receiving an error", async () => {
        const response = await request.post("/products").send(invalidProduct)

        expect(response.status).toBe(400)
        expect(response.body.message).toBe("INVALID_PRODUCT")
    })

    it("should test again that true is true", () => {
        expect(true).toBe(true)
    })
})
