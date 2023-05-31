import mongoose from "mongoose";

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    logoimage : {
type : String
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    categories : [
        {
            name : String
        }
    ],
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
            description: {
                type: String
            },
            category: {
                type: String
            },
            size: [
                {
                    name: {
                        type: String,
                    }
                }
            ]
        }
    ]
})

export const Seller = mongoose.model("Seller", restaurantSchema)