import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateItem from './CreateItem'
import { deleteProduct, findProduct } from '../../Redux/CRUDUser'
import { toogleCart } from '../../Redux/foodSlice'

const Items = () => {
  const sellerData = useSelector(state => state.userData)
  const viewProduct = useSelector(state => state.cart)
  const products = useSelector(state => state.products)
  
  const dispatch = useDispatch()
  useEffect(()=>{
dispatch(findProduct(sellerData?._id))// eslint-disable-next-line
  },[])
  const [editProduct,setEditProduct]=useState({
    display:false,
    name:"",
    image:"",
    price:"",
    description:"",
    category:"",
    id:""
  })
  return (
    <div className="w-full z-10">
    <h1 className='font-semibold py-8 pl-5'>Items</h1>
   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 w-full justify-around-items-center gap-x-12 gap-y-12">
{products?.length >= 1 && products?.map((product) => {
  const {name,image,price,description,category,_id}=product
  return(
    <div className=' w-auto shadow-xl border-2 rounded-xl pb-2 h-fit '>
    <img src={product.image} alt=""  className='w-56 h-56 object-contain mx-auto'/>
    <h1 className='text-center font-semibold text-2xl py-3'>{product.name}</h1>
    <h1 className='text-center text-gray-500  py-3'>{product.description}</h1>
    <div className="flex items-center justify-between px-8">
    <h1 className='text-center text-orange-500 font-semibold text-xl pb-2'>&#8377; {product.price}</h1>
    <h1 className='text-center font-semibold text-lg pb-2'>({product.category})</h1>
    </div>
    <div className="flex items-center justify-around">
        <button className='bg-blue-500 text-white p-3 rounded-lg w-24' onClick={()=>{dispatch(toogleCart());setEditProduct({name,image,price,description,category,_id})}}>Edit</button>
        <button onClick={()=>{dispatch(deleteProduct({id:sellerData._id,_id:product._id}))}} className='bg-red-500 text-white p-3 rounded-lg w-24'>Delete</button>
    </div>
        </div>
  )
})}
   </div>
   {viewProduct &&  <CreateItem data={editProduct}/>}
</div>
  )
}

export default Items