import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginDelivery } from '../Redux/CRUDUser'

const DeliveryLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login,setLogin]=useState({phone:"",password:""})
    const handleChange = (e) => {
      const name = e.target.name
      const value = e.target.value
      setLogin({...login , [name]:value})
    } 
  return (
    <div className='w-screen md:w-1/3 h-fit mx-auto px-8 pt-36 '>
    <div className='mx-auto pb-12'>
    <h1 className='text-2xl my-5 font-semibold'>Delivery Boy Login</h1>
    <h1 className='font-semibold '>Mobile Number</h1>
    <input type="number" name='phone' value={login.phone}  onChange={handleChange} className='h-8 w-11/12 border-b-2  mb-5 outline-none' />
    <h1 className='font-semibold '>Password</h1>
    <input type="password" name='password' value={login.password} onChange={handleChange} className='h-8 w-11/12 border-b-2  mb-5 outline-none' />
    <button onClick={()=>dispatch(loginDelivery(login))}  className='w-3/4 mx-10 bg-orange-500 rounded-lg h-12 my-2 text-white text-lg font-semibold'>Login</button>
    <h1 className='text-center my-2 text-lg '>Don't Have An Account ? <span className='text-orange-500 font-bold cursor-pointer' onClick={()=>navigate('/delivery/register')}>Sign Up</span></h1>
    </div>
   </div>
  )
}

export default DeliveryLogin