import mongoose from "mongoose";

const deliverySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image : {
        type : String,
        required : true
    },
    available:{
        type: String,
        required:true,
        default:true
    }
})

const Delivery = mongoose.model("Delivery" ,deliverySchema )
export default Delivery