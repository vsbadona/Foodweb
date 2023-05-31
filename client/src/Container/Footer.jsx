import React from 'react'
import Logo from "../Assets/Logo.png"

const Footer = () => {
  return (
    <div className='w-screen mt-12 py-12 bg-gray-50'>
      <div className=' flex items-center justify-around flex-wrap gap-y-8 md:gap-y-0 pl-8 md:pl-0'>
      <div className="flex flex-col w-full md:w-1/2 lg:w-1/4 gap-y-3">
        <div className="flex items-center">
          <img src={Logo} alt="" className='w-24 h-24' />
          <h1 className=' text-3xl font-mono font-extrabold'>YourFoodWeb</h1>
        </div>
        <p>One is to focus on the quality of your meal. If you can call out delicious food, crunchy food.</p>
        <p><span className='font-semibold'>Phone:</span> 9817697661</p>
        <p><span className='font-semibold'>Email:</span> Vishalsainisilu@gmail.com</p>
        <div className="flex items-center gap-x-3 text-xl" >
          <i className="fa fa-facebook hover:text-yellow-500"></i>
          <i className="fa fa-twitter hover:text-yellow-500"></i>
          <i className="fa fa-instagram hover:text-yellow-500"></i>
          <i className="fa fa-youtube hover:text-yellow-500"></i>
          <i className="fa fa-google-plus hover:text-yellow-500"></i>
        </div>
      </div>
      <div className='flex flex-col w-full md:w-fit gap-y-5 font-semibold text-lg'>
        <h1 className=' text-3xl'>Our Services</h1>
        <p className='hover:text-yellow-500'>Home</p>
        <p className='hover:text-yellow-500'>Store</p>
        <p className='hover:text-yellow-500'>Cart</p>
        <p className='hover:text-yellow-500'>All Restaurants</p>
      </div>
      <div className='flex flex-col gap-y-5 font-semibold text-lg w-full md:w-fit'>
        <h1 className=' text-3xl'>Usefull Links</h1>
        <p className='hover:text-yellow-500'>Home</p>
        <p className='hover:text-yellow-500'>Store</p>
        <p className='hover:text-yellow-500'>Cart</p>
        <p className='hover:text-yellow-500'>All Restaurants</p>
      </div>
    </div>
    <p className='text-center font-semibold pt-5'>Copyright 2023 © Theme Created By @<span className='font-bold'>VishalBadona</span> All Rights Reserved</p>
    </div>
  )
}

export default Footer