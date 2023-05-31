import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { filterSeller, findCategories, findRestaurant } from '../Redux/CRUDUser'

const Categories = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const Categories = useSelector(state => state.categories)
    const restaurants = useSelector(state => state.restaurants)
    useEffect(() => {
        dispatch(findCategories())
        dispatch(findRestaurant())// eslint-disable-next-line
    }, []) 
    return (
        <div className='my-8'>
            <p className='text-yellow-500 text-center font-serif font-semibold mb-3'>TOP FOODS</p>
            <h1 className='font-serif font-bold text-center text-3xl'>Our Categories</h1>
            <h1 className="text-yellow-500 text-3xl text-center">----</h1>
            <div className='grid xs:grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 place-items-center w-3/4 mx-auto mt-12 font-serif'>
                {Categories?.length !== 0 && Categories?.map((category) => {
                    return (
                        <div className='flex flex-col gap-y-3 text-center' key={Math.random() + Math.random()} onClick={() => { dispatch(filterSeller(category.name));localStorage.setItem("category",category.name); navigate('/restaurants') }} >
                            <img src={category.image} alt="" className='w-52 h-52 object-contain' />
                            <p className='font-bold '>{category.name}</p>
                            <p className='text-sm text-gray-700 '>{restaurants.filter((cat) => cat.categories.find(categ => categ.name === category.name)).length} Restaurants Products</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Categories