import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userName: {
        type: String
    },
    total: {
        type: Number
    },
    userImage: {
        type: String
    },
    userPhone: {
        type: Number
    },
    userAddress: {
        type: String
    },
    status: {
        type: String,
        default: "Recieved"
    },
    sellerName: {
        type: String,
        required: true
    },
    sellerId: {
        type: String,
        required: true
    },
    deliveryId: {
        type: String
    },
    products: [
        {
            name: {
                type: String
            },
            image: {
                type: String
            },
            price: {
                type: String
            },
            quantity: {
                type: String,
                default: 1
            },
        }
    ]
})

const Order = mongoose.model("Order", orderSchema)
export default Order