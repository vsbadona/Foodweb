import express from "express"
import { findOrder, getDelivery, loginDelivery, manageOrder, registerDelivery } from "../Controller/deliveryController.js"
const Routes = express.Router()

Routes.post('/register',registerDelivery)
Routes.post('/login',loginDelivery)
Routes.get('/',getDelivery)
Routes.get('/orders',findOrder)
Routes.get('/manage',manageOrder)
export default Routes