import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:{
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
    orders:[
        {
          name:{
            type:String
          },
          image:{
            type:String
          },
          price:{
            type:String
          },
          quantity:{
            type:String,
            default:1
          }
        }
    ],
    cart:[
        {
            name:{
              type:String
            },
            image:{
              type:String
            },
            price:{
              type:String
            },
            quantity:{
              type:String,
              default:1
            }
          }
    ]
})

const User = mongoose.model("User" ,userSchema )
export default User