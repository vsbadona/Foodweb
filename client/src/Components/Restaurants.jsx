import React, { useEffect } from 'react'
import Restaurant from "../Assets/Restaurant.jpg"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import norest from "../Assets/norest.png"
import { findRestaurant, findSeller } from '../Redux/CRUDUser'
import Cookies from 'js-cookie'

const Restaurants = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const restaurants = useSelector(state => state.restaurants)
  useEffect(() => {
    dispatch(findRestaurant())
  }, [])
  return (
    <div className='pt-12 bg-gray-100'>
      <p className='text-yellow-500 text-center font-serif font-semibold mb-3'>TOP RESTAURANTS</p>
      <h1 className='font-serif font-bold text-center text-3xl'>Popular Restaurants</h1>
      <h1 className="text-yellow-500 text-3xl text-center">----</h1>
      {restaurants.length !== 0 && <div className='grid xs:grid-col-1 lg:grid-cols-2  xl:grid-cols-3 gap-y-12 gap-x-72 place-items-center w-3/4 mx-auto mt-12 font-serif'>
        {restaurants.map((rest) =>
          <div className='w-80 xl:w-96 relative  ' key={Math.random() + Math.random()} onClick={() => { Cookies.set("seller", rest._id); navigate('/restaurant') }}>
            <img src={rest.image} alt="" className='object-contain' />
            <h1 className='absolute top-3 right-5 text-green-500 bg-white rounded-full px-2 py-1'><i className="fa fa-truck"></i></h1>
            <div className="flex absolute text-white text-sm top-44 ">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </div>
            <div className="pt-5 bg-white">
              <h1 className='text-xl font-semibold font-sans ml-2'>{rest.name}</h1>
              <div className='flex flex-wrap w-full gap-x-6 gap-y-3 ml-5 mt-3 pb-3'>
                {rest.categories.length !== 0 && rest.categories.map((category) =>
                  <p className='p-1 bg-gray-100' key={Math.random() + Math.random()}>{category.name}</p>
                )}
              </div>
            </div>
            <div className='bg-white mt-1 flex items-center gap-3 p-2'>
              <img src={rest.image} alt="" className='w-20 h-20 object-contain' />
              <div>
                <h1 className='text-yellow-700'><i className="fa fa-clock text-green-500"></i> 09:00 am - 11:00 pm</h1>
                <h1 className='text-gray-600'><i className="fa fa-location-dot text-orange-500"></i> {rest.location}</h1>
              </div>
            </div>
          </div>
        )}
      </div>}
      {restaurants.length == 0 && <div className="flex flex-col items-center justify-center">
        <div className='text-[200px] text-red-500 p-16' style={{ backgroundImage: `url(${norest})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}><i className="fa fa-cancel"></i></div>
        <h1 className='text-4xl font-bold -mt-8'>No Restaurant Found</h1>
      </div>}
    </div>
  )
}

export default Restaurants