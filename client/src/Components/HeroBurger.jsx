import React from 'react'
import Burger from "../Assets/HeroBurger.png"

const HeroBurger = () => {
  return (
    <div className='h-3/4 bg-orange-500 hidden lg:block mt-12'>
        <div style={{ backgroundImage: `url(${Burger})`, backgroundPosition: "right", backgroundSize: "Contain", backgroundRepeat: "no-repeat" }} className=' bg-gradient-to-t from-orange-500 to-yellow-400 h-screen w-screen bg-fixed  '>
          <div className='flex flex-col justify-center ml-24 h-screen w-1/3 gap-y-5'>
          <p className='text-yellow-500 font-semibold text-lg'>TASTY BURGER</p>
          <h1 className='text-5xl font-semibold'>EXPLORE THE BEST BURGER PLACE NEAR YOU</h1>
          <p className='text-5xl font-semibold text-yellow-500'>-----</p>
          <h1 className='text-4xl font-semibold'>Largest Business Restaurant Food Theme in the World.</h1>
          <p className='text-2xl font-medium '>Make Your Own Educational Institute listing website including academies schools pre schools certifications and many more...</p>
          <div className="flex gap-12 items-center">
            <button className='text-white bg-yellow-500 text-xl p-3'>Read More</button>
            <button className='text-white bg-black text-xl p-3'>Search Now</button>
          </div>
          </div>
        </div>
    </div>
  )
}

export default HeroBurger