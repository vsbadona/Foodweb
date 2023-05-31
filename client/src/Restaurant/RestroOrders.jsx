import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findSellerOrders, manageOrders } from '../Redux/CRUDUser'

const RestroOrders = () => {
  const dispatch = useDispatch()
  const sellerData = useSelector(state => state.userData)
  const orders = useSelector(state => state.orders)
  const [filteredOrders, setfilteredOrders] = useState([])
  const [viewOrder, setViewOrder] = useState({})
  useEffect(() => {
    dispatch(findSellerOrders(sellerData._id))
    if (orders?.length >= 1) {
      recieved()
    }
  }, [])
  const recieved = async () => {
    const filterOrder = await orders.filter(order => order.status == "Recieved")
    setfilteredOrders(filterOrder)
  }
  const prepared = async () => {
    const filterOrder = await orders.filter(order => order.status == "Prepared")
    setfilteredOrders(filterOrder)
  }
  const deliverey = async () => {
    const filterOrder = await orders.filter(order => order.status == "Delivered")
    setfilteredOrders(filterOrder)
  }

  return (
    <div className='sm:w-3/4 shadow-xl mx-auto flex flex-col xl:flex-row items-center xl:items-start py-12'>
      <div className="w-full xl:w-2/6 border-2  p-3 overflow-y-auto ">
        <div className="flex items-center gap-x-1 w-full justify-center " >
          <button onClick={recieved} className='hover:bg-orange-500 p-2 border-2  rounded-l-xl hover:text-white'>Recieved</button>
          <button onClick={prepared} className='hover:bg-orange-500 p-2 border-2  hover:text-white'>Prepared</button>
          <button onClick={deliverey} className='hover:bg-orange-500 p-2 border-2  rounded-r-xl hover:text-white'>Delivered</button>
        </div>
        {filteredOrders?.length >= 1 && filteredOrders?.map((order) => {
          const date = new Date(order.date)
          const Day = date.getDate()
          const Month = date.getMonth() + 1
          const Year = date.getYear()
          const Hours = date.getHours()
          const Minutes = date.getMinutes()
          return (
            <div onClick={()=>setViewOrder(order)} className='w-full h-fit border-2 my-3 flex justify-between items-center p-2'>
              <div>
                <h1 className='font-bold'>{order.status} </h1>
                <h1 className=''>{order._id} </h1>
                <h1 className='text-gray-500'>{`${Day}/${Month}/${Year} ${Hours}:${Minutes}`} </h1>
                <h1 className='text-orange-500 text-lg font-semibold'>&#8377; {order.total}</h1>
              </div>
              <div className="flex items-center gap-x-2">
                <i className="fa fa-angle-right"></i>
              </div>
            </div>
          )
        })}
      </div>
      <div className="w-full px-3">
        <h1 className='font-bold text-lg pl-3'>Order Details</h1>
        <div className='w-full border-2 p-2'>
          <div className="flex items-center justify-between w-full">
            <div>
              <h1 className='font-bold '>{viewOrder.status}</h1>
              <h1 className='text-gray-500'> {Date.now()}</h1>
            </div>
            <div className='flex items-center justify-center'>
              <img src={viewOrder.userImage} alt="" className='w-10 h-10 rounded-full' />
              <h1 className='font-semibold'>{viewOrder.userName}</h1>
            </div>
          </div>
          <div className='w-full h-[1px] my-5 bg-gray-300'></div>
          <div className="flex flex-col sm:flex-row items-center justify-around gap-y-3">
            <div className="flex flex-col items-center gap-y-3">
              <h1 className='text-gray-400'>Delivery Address</h1>
              <h1 className='font-bold'><i className="fa fa-location text-orange-500"></i> {viewOrder.userAddress}</h1>
            </div>
            <div className="flex flex-col">
              <h1 className='text-gray-400'>Estimated Time</h1>
              <h1 className='font-bold'><i className="fa fa-clock text-orange-500"></i> 20 Min</h1>
            </div>

          </div>
          <div className='w-full h-[1px] my-8 bg-gray-300'></div>
          <h1 className='font-semibold my-3'>Order Menu</h1>
        {viewOrder?.products?.length>=1 && viewOrder?.products?.map((product)=>{
          console.log(product);
          return(
            <div className="flex flex-col md:flex-row border-2 border-gray-100 my-2 items-center justify-around">
            <img src={product.image} alt="" className='w-20 h-20 p-2 border-2 border-orange-300 rounded-xl' />
            <div className="flex items-center justify-around w-full">
              <div className=''>
                <h1 className='font-semibold'>{product.name}</h1>
                <h1>x{product.quantity}</h1>
              </div>
              <h1 className='text-orange-500 font-semibold text-lg'>&#8377;{product.price} x {product.quantity} = {product.price*product.quantity}</h1>
            </div>
          </div>
          )
        })}
          <div className='w-full h-[1px] my-5 bg-gray-300'></div>
          <div className="flex items-center justify-between px-8">
            <h1 className='font-semibold'>Total</h1>
            <h1 className='text-orange-500 font-semibold text-lg'>&#8377; {viewOrder.total}</h1>
          </div>
          <div className="flex justify-end">
            <button onClick={()=>{dispatch(manageOrders({_id:viewOrder._id, status:"Cancelled"}));dispatch(findSellerOrders(sellerData._id))}} className='text-white bg-blue-500 p-3 my-3 hover:bg-blue-700  mx-2 rounded-xl'>Cancel</button>
            {viewOrder.status == "Recieved" && <button onClick={()=>{dispatch(manageOrders({_id:viewOrder._id, status:"Prepared"}));dispatch(findSellerOrders(sellerData._id))}} className='text-white bg-red-500 p-3 my-3 hover:bg-red-700  mx-2 rounded-xl'>Prepared</button>}
            {viewOrder.status == "Prepared" && <button onClick={()=>{dispatch(manageOrders({_id:viewOrder._id, status:"Delivered"}));dispatch(findSellerOrders(sellerData._id))}} className='text-white bg-green-500 p-3 my-3 hover:bg-green-700  mx-2 rounded-xl'>Delivered</button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestroOrders