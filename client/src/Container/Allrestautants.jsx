import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { filterSeller, findCategories, findRestaurant } from '../Redux/CRUDUser'

const Allrestautants = () => {
    const localCateg = localStorage.getItem("category")
    const [Categories, selectCategories] = useState([localCateg])
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findCategories())
        dispatch(findRestaurant())
        dispatch(filterSeller(Categories)) // eslint-disable-next-line
    }, [Categories])
    const Restros = useSelector(state => state.filteredSeller)
    const categories = useSelector(state => state.categories)
    const restaurants = useSelector(state => state.restaurants)

    const handleRadioChange = (event) => {
        const value = event.target.value;
        selectCategories([...Categories, value]);
    };
    return (
        <div className=" h-fit bg-gray-100 pb-32 flex flex-col md:flex-row overflow-x-hidden">
            <div className="w-screen md:w-1/3 lg:w-1/4 xl:w-1/5 pt-32 mb-8 bg-white px-8">
                <h1 className='text-3xl font-semibold'>Food Categories</h1>
                <p className='text-4xl text-yellow-500 font-bold -mt-8'>______ _ _</p>
                {categories?.length >= 1 && categories?.map((category) =>
                    <div className="flex items-center justify-between text-lg w-full py-2" key={Math.random() + Math.random()}>
                        <div className='flex items-center font-semibold'>
                            <input type="radio" className='text-orange-500' name="" id="" value={category.name} onChange={handleRadioChange} />
                            <h1>{category.name}</h1>
                        </div>
                        <h1>({restaurants.filter((cat) => cat.categories.find(categ => categ.name === category.name)).length})</h1>
                    </div>
                )}


            </div>

            <div className="w-screen md:w-2/3 mx-auto px-8">
                <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/05/top-banner_.png" alt="" className='object-contain h-72 hidden md:block' />
                <h1 className='text-4xl font-bold '>{Restros.length} Restaurants</h1>
                <p className='text-5xl text-yellow-500 -mt-8'>_____ _ _ _</p>
                <div className='grid lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-72 gap-x-24 gap-y-12 justify-items-center pt-12'>

                    {Restros?.length >= 1 && Restros?.map((restro) => {
                        return (
                            <div className='w-80 relative  ' key={Math.random() + Math.random()} onClick={() => { Cookies.set("seller", restro._id); navigate('/restaurant') }} >
                                <img src={restro.image} alt="" className='object-contain' />
                                <h1 className='absolute top-3 right-5 text-green-500 bg-white rounded-full px-2 py-1'><i className="fa fa-truck"></i></h1>
                                <div className="flex absolute text-white text-sm bottom-56 ">
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                    <i className="fa fa-star"></i>
                                </div>
                                <div className="pt-5 bg-white">
                                    <h1 className='text-xl font-semibold font-sans ml-2'>{restro.name}</h1>
                                    <div className='flex flex-wrap w-full gap-x-6 gap-y-3 ml-5 mt-3 pb-3'>
                                        {restro.categories.map((category) => <p  key={Math.random() + Math.random()} className='p-1 bg-gray-100'>{category.name}</p>
                                        )}
                                    </div>
                                </div>
                                <div className='bg-white mt-1 flex items-center gap-3 p-2'>
                                    <img src={restro.logoimage} alt="" className='w-20 h-20 object-contain' />
                                    <div>
                                        <h1 className='text-yellow-700'><i className="fa fa-clock text-green-500"></i> 09:00 am - 11:00 pm</h1>
                                        <h1 className='text-gray-600'><i className="fa fa-location-dot text-orange-500"></i> {restro.location}</h1>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {Restros?.length <= 0 && <h1 className='w-screen text-4xl font-bold   text-center'>Select Any Category</h1>}
                </div>
            </div>

        </div>
    )
}

export default Allrestautants