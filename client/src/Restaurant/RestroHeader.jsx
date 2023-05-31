import React, { useEffect, useState } from 'react'
import Logo from "../Assets/Logo.png"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin, logoutUser } from '../Redux/foodSlice'

const RestroHeader = () => {
  const [nav,setNav]=useState(false)
  const sellerData = useSelector(state => state.userData)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(checkLogin())
  },[])
  return (
    <div className="w-full h-fit bg-orange-500 text-white flex flex-col gap-y-5 py-3 lg:flex-row  justify-between items-center px-12">
       <div className="flex items-center">
        <img src={Logo} alt="" className='w-20 h-20 md:w-24 md:h-24' />
        <h1 className=' text-2xl md:text-3xl font-mono font-extrabold'>YourFoodWeb</h1>
      </div>
      <div className="flex items-center justify-around gap-x-24">
        <p><Link to="/seller/" >Menu</Link></p>
        <p><Link to="/seller/orders">Orders</Link></p>
      </div>
      <div onClick={()=>setNav(!nav)} className='flex items-center justify-center bg-orange-400 border-2 p-3 h-12 gap-x-2 relative'>
        <img src={sellerData.image} className='rounded-full h-9 w-9' alt="" />
      <p>{sellerData.name}</p>
      <i className="fa fa-angle-right"></i>
      {nav && <div className='bg-white p-3  w-fit h-fit text-black absolute top-12 border-2 shadow-xl right-0'>
        <h1 className='font-semibold my-2'><Link to="/seller/profile"><i className="fa fa-user pr-3"></i> Profile</Link></h1>
        <h1 className='font-semibold my-2'><i className="fa fa-cog pr-3"></i>Manage</h1>
        <h1 className='font-semibold my-2' onClick={()=>dispatch(logoutUser())}><i className="fa fa-sign-out pr-3"></i>Log Out</h1>
      </div>}
      </div>
    </div>
  )
}
 
export default RestroHeader