import express from "express"
import { filterRestautant, findCategories, findSeller, loginUser, myOrders, nearRestaurants, registerUser,updateProfile,userOrder } from "../Controller/userController.js"
const Routes = express.Router()

Routes.post('/register',registerUser)
Routes.post('/login',loginUser)
Routes.post('/update',updateProfile)
Routes.post('/order',userOrder)
Routes.get('/myorders',myOrders)
Routes.get('/restaurants',nearRestaurants)
Routes.get('/seller',findSeller)
Routes.get('/categories',findCategories)
Routes.post('/findrestaurant',filterRestautant)

export default Routes