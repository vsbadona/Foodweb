import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerSeller } from '../Redux/CRUDUser'

const RestroRegister = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [details, setdetails] = useState({
      image: "",
      logoimage:"",
      name: "",
      phone: "",
      email: "",
      password: "",
      location : ""
  })
  const handleChange = (e) => {
    setdetails({...details,[e.target.name]:e.target.value})
  }
  return ( 
    <div className='w-screen md:w-1/3 h-fit mx-auto px-8 bg-white pt-32  ' >
    <div className='mx-auto'>
    <h1 className='text-2xl my-5 font-semibold'>Restaurant Sign Up</h1>
    <h1 className='font-semibold'>Name</h1>
    <input type="text" onChange={handleChange} name="name" value={details.name} className='h-8 w-11/12 border-2 mb-5 outline-none' />
    <h1 className='font-semibold'>Email</h1>
    <input type="email" onChange={handleChange} name="email" value={details.email} className='h-8 w-11/12 border-2 mb-5 outline-none' />
    <h1 className='font-semibold'>Phone</h1>
    <input type="number" onChange={handleChange} name="phone" value={details.phone} className='h-8 w-11/12 border-2 mb-5 outline-none' />
    <h1 className='font-semibold'>Image</h1>
    <input type="url" onChange={handleChange} name="image" value={details.image} className='h-8 w-11/12 border-2 mb-5 outline-none' />
    <h1 className='font-semibold'>Logo Image</h1>
    <input type="url" onChange={handleChange} name="logoimage" value={details.logoimage} className='h-8 w-11/12 border-2 mb-5 outline-none' />
    <h1 className='font-semibold'>Password</h1>
    <input type="password" onChange={handleChange} name="password" value={details.password} className='h-8 w-11/12 border-2 mb-5 outline-none' />
    <h1 className='font-semibold'>Location</h1>
    <input type="text" onChange={handleChange} name='location' value={details.location}  className='h-8 w-11/12 border-2 mb-5 outline-none' />
    <button  className='w-3/4 mx-10 bg-orange-500 text-white rounded-lg h-12 my-2 ' onClick={()=>dispatch(registerSeller(details))}>Sign Up</button>
    <h1 className='text-center my-2'>Already Have An Account ? <span className='text-orange-500 cursor-pointer' onClick={()=>navigate('/login')}>Login</span></h1>
    </div>
   </div>
  )
}

export default RestroRegister