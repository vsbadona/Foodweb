import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { orderNow } from '../Redux/CRUDUser'

const Checkout = () => {
    const cartItems = useSelector(state => state.cartItems)
    const userData = useSelector(state => state.userData)
    const items = JSON.parse(localStorage.getItem("cart"))
 
    const total = cartItems.length>0&&cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      const [order,setOrder]=useState({
        userId : userData._id,
        name :userData.name || "",
        email : userData.email || "",
        phone :userData.phone || "",
        village :userData.village || "",
        landmark :userData.landmark || "",
        payment :"Cash On Delivery",
        products : items,
        total : total
      })
      const handleChange = (e) => {
setOrder({...order,[e.target.name]:e.target.value})
      }
      const dispatch = useDispatch()
          return (
        <div className='pt-1 lg:pt-12 w-screen  z-50 h-auto '>
            <div className="w-screen lg:w-3/4 border-2 bg-white shadow-xl h-fit mx-auto my-32 flex lg:flex-row flex-col" >
                <div className='w-full lg:w-3/5 border-2 px-8 py-8 border-r-0'>
                    <h1 className='text-xl font-semibold my-3'>Your Basic Information</h1>
                    <input type="text" name='name' className='w-11/12 h-8 border-2 mt-3 rounded-lg pl-3' placeholder='Your Name' onChange={handleChange} value={order.name} defaultValue={userData.name} />
                    <input type="email" name='email' className='w-11/12 h-8 border-2 mt-3 rounded-lg pl-3' placeholder='Email Address' onChange={handleChange} value={order.email} defaultValue={userData.email} />
                    <input type="number" name='phone' className='w-11/12 h-8 border-2 mt-3 rounded-lg pl-3' placeholder='Phone Number' onChange={handleChange} value={order.phone} defaultValue={userData.phone}/>
                    <h1 className='text-xl font-semibold mt-3'>Billing Address</h1>
                    <input type="text" className='w-11/12 h-8 border-2 mt-3 rounded-lg pl-3' placeholder='Village' name='village' value={order.village} onChange={handleChange} />
                    <input type="text" className='w-11/12 h-8 border-2 mt-3 rounded-lg pl-3' placeholder='Landmark' name='landmark' value={order.landmark} onChange={handleChange}/>
                    <h1 className='text-xl font-semibold my-3'>Choose Payment Method</h1>
                    <div className="flex gap-x-3"><input type="radio" name="" id="" className='w-5' /> <p className='text-lg font-medium'>Cash On Delivery</p> </div>
                    <div className="flex gap-x-3"><input type="radio" name="" id="" className='w-5' disabled/> <p className='text-lg text-gray-400 font-medium'>Online Payment</p> </div>
                </div>
                <div className='w-full lg:w-1/4 my-5 mx-auto rounded-lg border-2 px-5 py-20'>
                    <h1 className='text-xl font-semibold border-b-2 pb-3'>Your Cart</h1>
                    <p className="text-gray-400 my-2">We'll Deliver Your Order As Soon As Possible</p>
                    <p className='font-semibold'>Bill Details</p>
                    <div className="flex items-center justify-between mt-3"> <h1 className="text-gray-500">Item Total</h1> <p>&#8377; {total} </p> </div>
                   <div className="flex items-center justify-between mt-3 border-t-2"> <h1 className="text-gray-500">Deliver Fee</h1>  <p className='text-orange-500' >&#8377; 0.0 </p></div>
                    <div className="flex items-center justify-between mt-3 border-t-2"> <h1 className="text-gray-500">To Pay</h1> <p className='text-orange-500' >&#8377; {total} </p> </div>
               <button onClick={()=>dispatch(orderNow(order))} className='bg-orange-500 text-white w-11/12 h-8 my-8 mx-auto rounded-lg'>Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default Checkout