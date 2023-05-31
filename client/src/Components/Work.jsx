import React from 'react'
import Workimg from "../Assets/Work.jpg"
const Work = () => {
    return (
        <div className='relative'>
            <div className='w-screen h-96 relative -z-10'>
                <img src={Workimg} alt="" className='object-cover w-full h-full  ' />
                <div className='absolute top-0 pt-36 bg-opacity-50  mx-auto w-full bg-black  h-full'>
                    <p className='text-yellow-500 text-center text-2xl font-serif font-semibold mb-3'>HOW IT WORKS</p>
                    <h1 className='font-serif font-bold text-center text-4xl text-white'>SIMPLE PROCESS</h1>
                    <h1 className="text-yellow-500 text-3xl text-center">----</h1>
                </div>
            </div>
            <div className="bg-white w-10/12  border-2 mx-auto   z-50 -mt-24 grid grid-cols-1 lg:grid-cols-3">
                <div className=' h-80 bg-white  flex flex-col justify-center gap-y-3 pl-5'>
                    <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/002-checklist.png" alt="" className='w-32 h-32' />
                    <h1 className='text-3xl font-semibold'>Your Order</h1>
                    <p className=''>Thank you for being valued customer. We are so grateful to serving for the honored be clients pleasure of serving hope we meets.</p>
                </div>
                <div className=' h-80 bg-white  flex flex-col justify-center gap-y-3 pl-5'>
                    <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/001-salary.png" alt="" className='w-32 h-32' />
                    <h1 className='text-3xl font-semibold'>Cash On Delivery</h1>
                    <p className=''>Online food Delivery for hiring Food Foodota We appreciate your business, and we’ll do best to continue to give you the new kind.</p>
                </div><div className=' h-80 bg-white  flex flex-col justify-center gap-y-3 pl-5'>
                    <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/003-box.png" alt="" className='w-32 h-32' />
                    <h1 className='text-3xl font-semibold'>Receive Order</h1>
                    <p className=''>We at truly appreciate your business and we’re grateful for the trust you’ve placed in us. We sincerely hope you are satisfied .</p>
                </div>
            </div>
        </div>
    )
}

export default Work