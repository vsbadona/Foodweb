import express from "express"
import { findOrder, getDelivery, loginDelivery, manageOrder, registerDelivery, updateProfile } from "../Controller/deliveryController.js"
const Routes = express.Router()

Routes.post('/register',registerDelivery)
Routes.post('/login',loginDelivery)
Routes.post('/editprofile',updateProfile)
Routes.get('/',getDelivery)
Routes.get('/orders',findOrder)
Routes.get('/manage',manageOrder)
export default Routes