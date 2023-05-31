import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("user/login", async (props) => {
    const { phone, password } = props
    const data = await axios.post(`${process.env.REACT_APP_API}/login`, { phone, password })
    const response = data.data;
    return response

})

export const registerUser = createAsyncThunk("user/register", async (props) => {
    const { name, email, phone, password, image } = props
    const data = await axios.post(`${process.env.REACT_APP_API}/register`, { name, email, phone, password, image })
    const response = data.data;
    return response
})
export const updateProfile = createAsyncThunk("user/update", async (props) => {
    const { name, email, phone, password, image , _id } = props
    const userId = _id
    const data = await axios.post(`${process.env.REACT_APP_API}/update`, { name, email, phone, password, image,userId })
    const response = data.data;
    return response
})

export const findMyOrders = createAsyncThunk("user/orders", async (props) => {
    const { _id } = props
    const data = await axios.get(`${process.env.REACT_APP_API}/myorders?_id=${_id}`)
    return data.data
})
export const findRestaurant = createAsyncThunk("user/restaurants", async () => {
    const data = await axios.get(`${process.env.REACT_APP_API}/restaurants`)
return data.data
})

export const findSeller = createAsyncThunk('user/seller',async(_id) => {
    const data = await axios.get(`${process.env.REACT_APP_API}/seller?_id=${_id}`)
    return data.data
})

export const findCategories = createAsyncThunk('user/categories',async() => {
    const data = await axios.get(`${process.env.REACT_APP_API}/categories`)
    return data.data
})


export const orderNow = createAsyncThunk('user/order',async(props) => {
    const {userId,products,village,landmark,total}=props
    const userAddress = landmark + "," + village
 const sellerId = products[0].sellerId
 const data = await axios.post(`${process.env.REACT_APP_API}/order`,{userId,products,sellerId,userAddress,total})
return data.data
})

export const filterSeller = createAsyncThunk('seller/find',async(categories) => {
const data = await axios.post(`${process.env.REACT_APP_API}/findrestaurant`,[categories])
return data.data
})

// Seller Api Calling

export const updateCategory = createAsyncThunk('seller/updateCategory',async(props) => {
    const {name,image,id}=props
    const data = await axios.post(`${process.env.REACT_APP_API}/seller/updatecategory`,{name,image,id})
    return data.data
})
export const createCategory = createAsyncThunk('seller/createCategory',async(props) => {
    const {name,image}=props
    const data = await axios.get(`${process.env.REACT_APP_API}/seller/createcategory?name=${name}&image=${image}`)
    return data.data
})

export const createProduct = createAsyncThunk('seller/createproduct',async(props) => {
    const {name,image,price,description,category,sellerId}=props
    const data = await  axios.post(`${process.env.REACT_APP_API}/seller/create`,{name,image,price,description,category,sellerId})
    return data.data
})
export const findProduct = createAsyncThunk('seller/findproduct',async(_id) => {
    const data = await  axios.get(`${process.env.REACT_APP_API}/seller/find?_id=${_id}`)
    return data.data
})
export const updateProduct = createAsyncThunk('seller/updateproduct',async(props) => {
    const {name,image,price,description,category,id,_id} = props
    const product_id = _id
    const data = await  axios.post(`${process.env.REACT_APP_API}/seller/edit`,{name,image,price,description,category,id,product_id})
    return data.data
})
export const deleteProduct = createAsyncThunk('seller/deleteproduct',async(props) => {
    const {id,_id} = props
    const data = await  axios.delete(`${process.env.REACT_APP_API}/seller/delete?id=${id}&product_id=${_id}`)
    return data.data
})
export const loginSeller = createAsyncThunk('seller/login',async(props) => {
    const {phone,password} = props
    const data = await  axios.post(`${process.env.REACT_APP_API}/seller/login`,{phone,password})
   return data.data
})
export const findSellerOrders = createAsyncThunk('seller/findorders',async(props) => {
    const data = await  axios.get(`${process.env.REACT_APP_API}/seller/orders?sellerID=${props}`)
   return data.data
})
export const manageOrders = createAsyncThunk('seller/manageorders',async(props) => {
    const {_id,status} = props
    const data = await  axios.get(`${process.env.REACT_APP_API}/seller/manage?_id=${_id}&status=${status}`)
   return data.data;
})
export const addCategory = createAsyncThunk('seller/addCategory',async(props) => {
    const {_id,category} = props
    const data = await  axios.post(`${process.env.REACT_APP_API}/seller/add`,{_id,category})
   return data.data;
})
export const removeCategory = createAsyncThunk('seller/removeCategory',async(props) => {
    const {_id,id} = props
    const data = await  axios.post(`${process.env.REACT_APP_API}/seller/remove`,{_id,id})
   return data.data;
})