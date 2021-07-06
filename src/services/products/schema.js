import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
}, { timestamps: true })

export default ProductSchema