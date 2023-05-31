import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findMyOrders } from '../Redux/CRUDUser'
import Empty from "../Assets/empty.svg"
import { checkCart } from '../Redux/foodSlice'
const Orders = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.userData)
    const _id = data
    useEffect(() => {
        dispatch(findMyOrders(_id))
    }, [])
    const orders = useSelector(state => state.orders)
    const orderCards = () => {
        return (
            orders.length !== 0 && orders.map((order) => {
                const StringDate = order.date
                const dateObj = new Date(StringDate);
                const year = dateObj.getFullYear()
                const month = dateObj.getMonth() + 1
                const date = dateObj.getDate()
                const hours = dateObj.getHours()
                const minutes = dateObj.getMinutes()
                return (
                    <div key={Math.random() + Math.random()} className='w-screen md:w-96 h-fit bg-white shadow-xl py-2 border-2 rounded-xl px-3'>
                        <p className='text-center text-gray-700 font-medium'>Order #{order._id}</p>
                        <p className='text-center text-gray-700 font-medium'>{date}/{month}/{year} {hours}:{minutes}</p>
                        <div className='w-full h-0.5 bg-gray-300 my-2'></div>
                        <div className="flex items-center justify-between">
                            <div> <p className='text-lg font-semibold'>{order.sellerName}</p>
                                <div className="flex items-center gap-x-1">
                                    <i className="fa fa-star text-yellow-500"></i>
                                    <p className='text-gray-600'>5.0</p>
                                    <p className='bg-gray-200 h-2 w-2 rounded-full'></p>
                                    <p className='text-gray-600'>1k+ Reviews</p>
                                </div></div>
                            <div className='w-1/2'>
                                <p className='font-bold'>Address</p>
                                <p className=''>To: {order.userName},{order.userAddress}</p>
                            </div>
                        </div>
                        <div className='w-full h-0.5 bg-gray-300 my-2'></div>
                        <p className='font-bold'>Order Menu</p>
                        {order.products.map((product) => {
                            return (
                                <div key={Math.random() + Math.random()} className="flex items-center gap-x-2 justify-around mb-3">
                                    <img src={product.image} className='border-2 rounded-xl  w-16 h-16 border-yellow-500' alt="" />
                                    <div>
                                        <p className='font-bold'>{product.name}</p>
                                        <p className='font-medium'><i className="fa fa-chart-simple text-orange-500"></i> {product.quantity}</p>
                                    </div>
                                    <p className='text-yellow-500 font-semibold'>+ &#8377; {product.price}</p>
                                </div>
                            )
                        })}
                        <div className='w-full h-0.5 bg-gray-300 my-2'></div>
                        <div className="flex items center justify-between px-8">
                            <p className='font-semibold'>Total</p>
                            <p className='font-semibold text-yellow-500'>&#8377; {order.total} </p>
                        </div>
                        <p className={` w-11/12 my-3 py-3 rounded-xl text-center mx-auto  ${order.status === "Cancelled" && "text-red-500"}  ${order.status === "Cancelled" && "bg-red-100"} text-green-500 bg-green-100`}>{order.status === "Delivered" && <i className="fa fa-check"></i> } {order.status === "Cancelled" && <i className="fa fa-multiply"></i> } {order.status}</p>
                    </div>
                )
            })
        )
    }
    return (
        orders.length == 0 ? <div className='w-full  pt-28 md:pt-32  flex flex-col items-center justify-center'>
            <img src={Empty} alt="" className='md:w-1/3 md:h-1/3 object-contain' />
            <h1 className='text-4xl font-bold mt-12'>No Orders Found</h1>
        </div> : <div className='w-3/4 mx-auto  py-32 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-x-48 gap-y-20'>
            {orderCards()}
            <button onClick={() => { dispatch(findMyOrders(_id)); orderCards() }} className='bg-blue-500 text-white fixed right-6 bottom-32 rounded-full  py-3 px-4 text-xl' ><i className="fa fa-refresh"></i></button>
        </div>

    )
}

export default Orders