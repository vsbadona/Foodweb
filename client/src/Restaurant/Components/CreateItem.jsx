import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toogleCart } from '../../Redux/foodSlice'
import { createProduct, findCategories, updateProduct } from '../../Redux/CRUDUser'

const CreateItem = ({ data }) => {
  const { name, image, price, description, _id, category } = data
  const sellerData = useSelector(state => state.userData)
  const categories = useSelector(state => state.categories)
  const dispatch = useDispatch()
  const [product, setProduct] = useState({
    display: false,
    name: name || "",
    image: image || "",
    price: price || "",
    description: description || "",
    category: category || "",
    sellerId: sellerData._id
  })// eslint-disable-next-line
  useEffect(() => { dispatch(findCategories()) }, []) 
  return (
    <div className='border-2 rounded-t-xl w-screen md:w-1/2 h-fit z-50 bg-opacity-100 bg-white fixed top-1/2 bottom-1/2 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <div className="flex items-center justify-between px-3 border-b-2 ">
        <h1 className='text-xl font-bold'>{_id ? "Update" : "Create New"} Item</h1>
        <button className='text-xl' onClick={() => dispatch(toogleCart())}>
          <i className="fa fa-multiply text-red-500 "></i>
        </button>
      </div>
      <div className='w-3/4 mx-auto py-5'>
        <div className="my-3">
          <p className='text-gray-600 font-semibold'>Item Title</p>
          <input type="text" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className='w-full border-2 h-8 rounded-xl border-gray-700 pl-3' placeholder='Enter Item Name' />
        </div>
        <div className="flex flex-col sm:flex-row gap-x-5  w-full justify-between items-center my-2">
          <div className='w-full'>
            <h1 className='text-gray-600 font-semibold'>Item Price</h1>
            <input type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} placeholder='&#8377; ' className='w-full border-2 h-8 rounded-xl border-gray-700 pl-3' />
          </div>
          <div className='w-full'>
            <h1 className='text-gray-600 font-semibold'>Item Category</h1>
            {/* <input type="number" placeholder='&#8377; ' className='w-full border-2 h-8 rounded-xl border-gray-700 pl-3'/> */}
            <select name="" id="" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} className='w-full px-5 lg:px-12 border-2 h-8 rounded-xl border-gray-700 bg-white' >
              <option value="">Select Category</option>
              {categories?.length >= 1 && categories?.map((category) =>
                <option key={Math.random() + Math.random()} value={category.name}>{category.name}</option>
              )}
            </select>
          </div>
        </div>
        <div className='my-3 '>
          <p className='text-gray-600 font-semibold '>Item Image</p>
          <div className="flex items-center gap-x-1">
            <img src={product.image} alt="" className='w-12 h-12 rounded-full' />
            <input value={product.image} onChange={(e) => setProduct({ ...product, image: e.target.value })} type="url" placeholder='Enter Image Url' className='w-full border-2 h-8 rounded-xl border-gray-700 pl-3' />
          </div>
        </div>

        <div className='my-3'>
          <p className='text-gray-600 font-semibold'>Item Description</p>
          <input type="text" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} placeholder='Enter Image Description' className='w-full border-2 h-8 rounded-xl border-gray-700 pl-3' />
        </div>
        <div className="flex items-center justify-end">
          {_id ? <button onClick={() => { dispatch(updateProduct({ name: product.name, price: product.price, image: product.image, description: product.description, category: product.category, id: product.sellerId, _id: _id })); dispatch(toogleCart()); setProduct({}) }} className='text-white bg-orange-500 p-3 rounded-lg hover:bg-orange-700'>Update Item</button> : <button onClick={() => { dispatch(createProduct(product)); dispatch(toogleCart()); setProduct({}) }} className='text-white bg-orange-500 p-3 rounded-lg hover:bg-orange-700'>Create Item</button>}
        </div>
      </div>
    </div>
  )
}

export default CreateItem