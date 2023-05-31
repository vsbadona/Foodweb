import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findCategories,updateCategory,createCategory } from '../../Redux/CRUDUser'
import { toogleCategory } from '../../Redux/foodSlice'

const Category = () => {
    const dispatch = useDispatch()
    const Categories = useSelector(state => state.categories)
    const Cate = useSelector(state => state.createCateg)
    useEffect(()=>{
dispatch(findCategories())
    },[])
    const [details,setDetails]=useState({
        id:"",
        name:"",
        image:""
    })
  return (
    <div className="w-full ">
        <h1 className='font-semibold pl-5 py-4'>Category</h1>
        <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-5 place-items-center gap-x-5 gap-y-8  ">
{Categories?.length>=1 && Categories?.map((category)=>
    <div className='w-36 h-36 border-2 py-5 rounded-xl' onClick={() => {dispatch(toogleCategory());setDetails({name:category.name,image:category.image,id:category._id})}} >
    <img src={category.image} alt="" className='w-20 h-20 object-contain mx-auto' />
    <h1 className='text-center py-2 '>{category.name}</h1>
</div>
)}
 <div className='w-36 h-36 border-2 py-5 rounded-xl'>
    <button className='w-36 h-20 text-3xl text-center mx-auto' onClick={() => dispatch(toogleCategory())} >
  +
    </button>
    <h1 className='text-center py-2 '>Add Category</h1>
</div>
        </div>

{Cate && <div className=' border-2 rounded-t-xl w-screen md:w-1/4 h-fit z-50 bg-opacity-100 bg-white fixed top-1/2 bottom-1/2 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl'>
<div className="flex items-center justify-between px-3 border-b-2 ">
        <h1 className='text-xl font-bold'>{details.id?"Update":"Create New"} Category</h1>
        <button  className='text-xl text-red-500' onClick={()=>{dispatch(toogleCategory());setDetails({})}}>
x
        </button>
        </div>
        <div className="my-3">
       <p className='text-gray-600 font-semibold'>Category Name</p>
        <input type="text" onChange={(e)=>setDetails({...details,name:e.target.value})} name="nae" className='w-full border-2 h-8 rounded-xl border-gray-700 pl-3' value={details.name} placeholder='Category Name'/>
       </div> <div className="my-3">
       <p className='text-gray-600 font-semibold'>Item Image</p>
       <div className="flex items-center gap-x-1">
       <img src={details.image}  alt=""  className='w-12 h-12 rounded-full  object-contain'/>
        <input type="url" name="image" onChange={(e)=>setDetails({...details,image:e.target.value})} value={details.image} placeholder='Enter Image Url' className='w-full border-2 h-8 rounded-xl border-gray-700 pl-3' />
       </div>
       </div>
       <div className="flex items-center justify-center">
{details.id?<button onClick={()=>{dispatch(toogleCategory());setDetails({});dispatch(updateCategory(details))}} className='text-white bg-orange-500 p-3 rounded-lg hover:bg-orange-700'>Update Category</button>
:        <button className='text-white bg-orange-500 p-3 rounded-lg hover:bg-orange-700' onClick={()=>{dispatch(toogleCategory());setDetails({});dispatch(createCategory(details))}}>Create Category</button>
}
       </div>
</div>}
    </div>
  )
}

export default Category