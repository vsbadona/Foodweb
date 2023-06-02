import express from "express"
import { createProduct, deleteProduct, editProduct, loginSeller, registerSeller,getSeller, findOrder,manageOrder, createCategory,updateCategory, findProduct, addCategory,removeCategory, updateProfile } from "../Controller/sellerController.js"
const Routes = express.Router()

Routes.post('/register',registerSeller)
Routes.post('/login',loginSeller)
Routes.post('/editprofile',updateProfile)
Routes.post('/create',createProduct)
Routes.get('/find',findProduct)
Routes.post('/edit',editProduct)
Routes.delete('/delete',deleteProduct)
Routes.get('/',getSeller)
Routes.get('/orders',findOrder)
Routes.get('/manage',manageOrder)
Routes.get('/createcategory',createCategory)
Routes.post('/updatecategory',updateCategory)
Routes.post('/add',addCategory)
Routes.post('/remove',removeCategory)
export default Routes