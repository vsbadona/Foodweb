import React, { useEffect, useState } from 'react'
import Logo from "../Assets/Logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, toogleCart } from '../Redux/foodSlice'
import { checkLogin } from '../Redux/foodSlice'

const Header = () => {
  const [display, setDisplay] = useState("hidden")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleNav = () => {
    if (display === "hidden") {
      setDisplay("block")
    } else {
      setDisplay("hidden")
    }
  }
  const handleMenu = () => {
    if (submenu === "hidden") {
      setSubmenu("block")
    } else {
      setSubmenu("hidden")
    }
  }
  
  const data = useSelector(state => state.userData)
  const cartItems = useSelector(state => state.cartItems)
  const [submenu, setSubmenu] = useState(false)
  useEffect(() => {
    dispatch(checkLogin())
    handleMenu() // eslint-disable-next-line
  }, [])
  const auth = useSelector(state => state.login)
  return (
    <div className="w-screen h-fit border-2 flex items-center justify-between overflow-hidden fixed z-50 bg-white ">
      <div className="flex items-center ml-0 md:ml-5">
        <img src={Logo} alt="" className='w-20 h-20 md:w-28 md:h-28' />
        <h1 className='text-red-500 text-2xl md:text-3xl font-mono font-extrabold'>YourFoodWeb</h1>
      </div>
      <div onClick={() => handleNav()} className={`xs:flex-col lg:flex font-sans items-center gap-x-20 font-semibold mr-5 fixed lg:static top-24 w-screen text-center lg:w-auto bg-white lg:bg-none z-50 ${display} `}>
        <p className='mt-8 lg:mt-0'><Link to='/'>Home</Link></p>
        <p className='mt-8 lg:mt-0'><Link to="/restaurants">Restaurants</Link></p>

        {auth ? <div className='relative my-4' onClick={() => handleMenu()}> <h1>Welcome {data.name} <i className="fa fa-angle-down" ></i></h1>
          <div className={`flex flex-row md:flex-col items-center justify-center gap-y-3 border-2 bg-white md:fixed md:top-20 w-full  md:right-auto p-3 md:w-36 md:${submenu} `}>
            <p className="hover:bg-gray-200 w-full"><Link to="/profile">Profile</Link></p>
            <p className="hover:bg-gray-200 w-full"><Link to="/orders">Orders</Link></p>
            <p onClick={() => { dispatch(logoutUser()); navigate('/') }} className="hover:bg-gray-200 w-full">Logout</p>
          </div>
        </div> : <> <p className='mt-8 lg:mt-0'><Link to="/login">Login</Link></p>
          <p className='mt-8 lg:mt-0'><Link to="/register">Register</Link></p></>}

        <p className='bg-yellow-500 p-3 w-48 mx-auto my-8 lg:my-0'>Search Restaurant</p>
      </div>
      <button className='text-2xl mr-5 focus:text-red-500 block lg:hidden' onClick={() => handleNav()}><i className="fa fa-bars" ></i></button>
      <div className=' fixed z-50 right-10 bottom-16  md:right-12 md:bottom-12'> 
      
      <button onClick={() => dispatch(toogleCart())} className='text-3xl bg-orange-500 text-white p-3 rounded-full '><i className="fa fa-shopping-cart "></i></button>

        {cartItems.length >= 1 && <p className='bg-orange-500 text-white rounded-full text-center px-1 py-1 w-8  fixed  z-50  right-5 bottom-24'>{cartItems?.length}</p>}
      </div>
    </div>
  )
}

export default Header