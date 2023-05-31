import cors from "cors"
import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./Routes/userRoutes.js"
import sellerRoutes from "./Routes/sellerRoutes.js"
import deliveryRoutes from "./Routes/deliveryRoutes.js"

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/',userRoutes)
app.use('/seller',sellerRoutes)
app.use('/delivery',deliveryRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT , ()=>{console.log(`App is listening on PORT:${PORT}`)})
mongoose.connect(process.env.CONNECTION_URL)
const db = mongoose.connection
db.on("error",(err)=>{console.log(err.message,"Can't Connect TO Db");})
db.once("open",()=>{console.log("Connected To Db");})