import express from "express"
import { createProduct, deleteProduct, editProduct, loginSeller, registerSeller,getSeller, findOrder,manageOrder, createCategory,updateCategory, findProduct, addCategory,removeCategory, updateProfile, updatePassword, deleteCategory } from "../Controller/sellerController.js"
const Routes = express.Router()
import multer from "multer"

const upload = multer({dest : 'uploads/'});
Routes.post('/register',upload.single('image'),registerSeller)
Routes.post('/login',loginSeller)
Routes.post('/editprofile',upload.single('image'),updateProfile)
Routes.post('/updatepassword',updatePassword)
Routes.post('/create',createProduct)
Routes.get('/find',findProduct)
Routes.post('/edit',editProduct)
Routes.delete('/delete',deleteProduct)
Routes.get('/',getSeller)
Routes.get('/orders',findOrder)
Routes.get('/manage',manageOrder)
Routes.get('/createcategory',createCategory)
Routes.post('/updatecategory',updateCategory)
Routes.post('/deletecategory',deleteCategory)
Routes.post('/add',addCategory)
Routes.post('/remove',removeCategory)
export default Routes