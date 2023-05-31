import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkCart, clearCart, removeItem, toogleCart, updateCart } from '../Redux/foodSlice'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cartItems = useSelector(state => state.cartItems)
    const handleSubtract = (data, quantity) => {
        // const id = user._id
        quantity -= 1
        const product = {
            id: data.id,
            name: data.name,
            price: data.price,
            image: data.image,
            quantity: quantity,
            sellerId: data.sellerId

        }
        dispatch(updateCart(product))
    }
    const handleAddition = (data, quantity) => {
        // const id = user._id
        quantity += 1
        const product = {
            id: data.id,
            name: data.name,
            price: data.price,
            image: data.image,
            quantity: quantity,
            description: data.description,
            sellerId: data.sellerId
        }
        dispatch(updateCart(product))
    }
    useEffect(() => {
        dispatch(checkCart()) // eslint-disable-next-line
    }, [])
    const total = cartItems.length > 0 && cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);
    return (
        <div className='w-screen md:w-96  h-full z-50 fixed right-0  rounded-xl  bg-white border-2 shadow-xl'>
            <div className="flex items-center justify-between px-8 py-8 border-b-2 border-orange-500">
                <p className='text-lg' onClick={() => dispatch(toogleCart())}><i className="fa fa-arrow-left"></i></p>
                <div className="flex items-center justify-center text-lg gap-x-1">
                    <p className='font-semibold text-xl'>Cart</p>
                    <i className="fa fa-shopping-cart  text-red-500"></i>
                </div>
                <div onClick={() => dispatch(clearCart())} className="flex items-center justify-center text-lg gap-x-1">
                    <p className='font-semibold text-xl '>Clear</p>
                    <i className="fa fa-refresh text-red-500"></i>
                </div>
            </div>
            <div className="h-4/6   w-full overflow-y-auto ">
                {cartItems?.length !== 0 && cartItems?.map((items) => {
                    const item = {
                        name: items.name,
                        image: items.image,
                        price: items.price,
                        quantity: items.quantity,
                        id: items.id,
                        sellerId: items.sellerId
                    }
                    return (
                        <div className="flex items-center justify-around w-full py-2 " key={Math.random() + Math.random()}>
                            <img src={items.image} className='h-16 w-16 p-1 bg-white rounded-xl border-2 border-orange-500' alt="" />
                            <div className='text-lg font-semibold'>
                                <h1>{items.name}</h1>
                                <p className='font-medium text-base'>&#8377; {items.price} </p>
                            </div>
                            <div className="flex items-center  bg-white border-2 border-orange-500 rounded-xl">
                                <button disabled={item.quantity<=1} onClick={() => handleSubtract(item, item.quantity)} className='text-orange-500 text-xl font-bold border-r-2 p-2'>-</button>
                                <input disabled type="number" value={items.quantity} className='w-10 h-8  text-red-500 text-xl text-center' />
                                <button onClick={() => handleAddition(item, item.quantity)} className='text-orange-500 text-xl font-bold border-l-2 p-2'>+</button>

                            </div>
                            <p onClick={() => { dispatch(removeItem(items)); dispatch(checkCart()) }} className='bg-red-500 w-8 h-8 text-center rounded-xl'><i className="fa fa-trash text-xl text-white py-1"></i></p>
                        </div>
                    )
                })}
            </div>
            <div className='w-full h-1/6 absolute bottom-0 text-2xl border-t-2 border-orange-500'>
                <div className="flex items-center justify-around">
                    <h1 className='text-xl font-semibold'>Delivery</h1>
                    <h1>-</h1>
                    <h1>&#8377; 20.00</h1>
                </div>
                <button disabled={!total} onClick={() => { navigate('/checkout'); dispatch(toogleCart()) }} className='disabled:bg-orange-300 bg-orange-500 text-white text-center w-full h-12 mt-5 text-xl'>Checkout &#8377; {total || 0}</button>
            </div>
        </div>
    )
}

export default Cart