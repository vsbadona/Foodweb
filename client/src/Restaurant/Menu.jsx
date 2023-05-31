import React, { useState } from 'react'
import Category from './Components/Category'
import Items from './Components/Items'
import { useDispatch, useSelector } from 'react-redux'
import { toogleCart } from '../Redux/foodSlice'


const Menu = () => {
  const dispatch = useDispatch()
 
  return (
   <div className="w-screen md:w-3/4 mx-auto bg-white shadow-xl h-full py-5 z-10">
  <div className="flex flex-col gap-y-5 md:flex-row items-center justify-between">
    <div className="flex items-center justify-center">
    <input type="text" placeholder='Search Anything' className='w-56 border-y-2 border-l-2 rounded-l-xl outline-none h-12' />
    <button className='border-y-2 rounded-r-xl border-r-2 h-12 px-2'><i className="fa fa-magnifying-glass text-orange-500 " ></i></button>
    </div>
    <button onClick={() => dispatch(toogleCart())} className='bg-orange-500 p-3 rounded-lg text-white'>Add New Item</button>
  </div>
  <Category/>
  <Items/>

   </div>
  )
}

export default Menu