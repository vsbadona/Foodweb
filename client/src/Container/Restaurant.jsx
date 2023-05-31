import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findSeller } from '../Redux/CRUDUser'
import { addCart, selectCategory } from '../Redux/foodSlice'

const Restaurant = () => {
    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth", // Add smooth scrolling behavior
        });
      };
    const _id = Cookies.get("seller")
    const selectedCategory = useSelector(state => state.category)
    const dispatch = useDispatch()
    useEffect(() => {
        scrollToTop()
        dispatch(findSeller(_id))
    }, [_id, selectCategory])
    const seller = useSelector(state => state.seller)
const products = seller.products
var latest = {}
if(seller?.products?.length>=1){
    latest = seller?.products[products.length -1] 
}    return (
        <div className="w-screen max-h-fit relative flex flex-col items-center bg-gray-100">
            <div className=' w-full object-cover'>
                <img src={seller?.image} alt="" className='object-cover h-[500px] w-screen' />
            </div>
            <div className='w-screen h-fit  flex flex-wrap  items-end justify-around mx-auto bg-white'>
                <div className="flex items-center">
                    <img src={seller?.image} alt="" className='rounded-t-full h-60 w-56 border-8 border-white -mt-12 hidden md:block' />
                    <div className=' flex flex-col gap-y-5 mt-3 md:mt-0'>   <div className="flex items-center gap-x-1 text-gray-400" >
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                        <h1 className='text-3xl font-bold'>{seller?.name}</h1>
                        <p className='text-gray-400' ><i className="fa fa-location text-yellow-500 text-lg"></i> {seller?.location}</p>
                    </div>
                </div>
                <button className='bg-yellow-500 w-full lg:w-72 border-none py-5 text-xl hover:bg-yellow-600 hover:text-white'>Locate Us </button>
            </div>
            <div className=" grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-36 lg:gap-x-72 gap-y-20 my-12 justify-items-center justify-center ">
                <div className='  w-72 pl-5 py-8 bg-white rounded-xl h-fit'>
                    <h1 className='text-2xl font-semibold'>All Details</h1>
                    <p className='text-4xl text-yellow-500 font-bold'>______ _ _</p>
                    <p className='py-5 w-full mb-5 font-medium hover:bg-gray-200'><i className="fa fa-book text-blue-500"></i> Menu</p>
                    <p className='py-5 w-full mb-5 font-medium hover:bg-gray-200'> <i className="fa fa-star text-yellow-500"></i> Reviews</p>
                    <p className='py-5 w-full font-medium hover:bg-gray-200'><i className="fa fa-info text-red-500"></i> Restaurant Info</p>
                </div>
                <div className='bg-white h-fit rounded-xl  py-8 px-5  row-span-3 justify-self-center lg:w-[600px] xl:w-[800px] lg:mr-32 xl:mr-0'>
                    <h1 className='text-2xl font-semibold '>Categories</h1>
                    <p className='text-4xl text-yellow-500 font-bold -mt-5'>_______ _ _ _</p>
                    <div className="flex gap-x-3 my-5 flex-wrap xl:flex-nowrap ">
                        {seller?.categories?.map((category) =>
                            <button key={Math.random() + Math.random()} onClick={() => dispatch(selectCategory(category.name))} className='py-2 px-16 font-semibold text-lg active:bg-black active:text-white hover:bg-black hover:text-white border-b-2'>{category.name}</button>

                        )}
                    </div>
                    <h1 className='text-lg font-semibold'>{selectedCategory}</h1>
                    <div className='w-full bg-gray-200 h-1 my-2'><div className='bg-yellow-500 w-16 h-1'></div></div>

                    <div className=' overflow-y-auto w-full'>
                        {selectedCategory && seller?.products?.filter((product) => product.category == selectedCategory)?.map((product) => {
                            return (
                                <div key={Math.random() + Math.random()} className=' h-fit border-2 border-gray-100 flex items-center justify-around flex-wrap'>
                                    <img src={product.image} alt="" className='w-24 h-24 object-contain' />
                                    <div className="flex flex-col">
                                        <h1 className='text-xl font-semibold'>{product.name}</h1>
                                        <p className=''>{product.description}</p>
                                        <p className='text-yellow-500'>&#8377; {product.price}</p>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <input type="number" name="" id=""  defaultValue={1} className='text-center bg-gray-300 w-12 h-12 outline-none' />
                                        <button className='bg-yellow-500 hover:bg-black hover:text-white px-12 py-3'>Order Now</button>
                                    </div>
                                </div>
                            )
                        })}
                        {!selectedCategory && seller?.products?.map((product) => {
                            var qun = 1
                            const cart = {
                                id : product._id,
                               name: product.name,
                               image: product.image,
                               price: product.price,
                               quantity : qun,
                               sellerId : seller._id
                            }
                            return (
                                <div key={Math.random() + Math.random()} className=' h-fit border-2 border-gray-100 flex items-center justify-around flex-wrap'>
                                    <img src={product.image} alt="" className='w-24 h-24 object-contain' />
                                    <div className="flex flex-col">
                                        <h1 className='text-xl font-semibold'>{product.name}</h1>
                                        <p className=''>{product.description}</p>
                                        <p className='text-yellow-500'>&#8377; {product.price}</p>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <button onClick={() => dispatch(addCart(cart))} className='bg-yellow-500 hover:bg-black hover:text-white px-12 py-3'>Order Now</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
                {/* {seller?.products?.length !==0 && <div className='bg-white  w-72 py-8 px-5 rounded-xl '>
                <h1 className='text-2xl font-semibold '>Best Selling Product</h1>
                <p className='text-4xl text-yellow-500 font-bold -mt-5'>_______ _ _</p>
                <div className='flex flex-col gap-y-4 border-2 px-5 mt-3 rounded-xl'>
                    <img src={seller?.products[0].image} alt="" />
                    <div className="flex gap-1 items-center text-gray-300">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                    </div>
                    <h1 className='text-xl font-semibold'>{seller?.products[0].name}</h1>
                    <p className='font-semibold text-lg text-yellow-500'>&#8377;{seller?.products[0].price}</p>
                    <button className='py-3 px-12 w-auto mx-auto  bg-yellow-500 hover:bg-black hover:text-white'>Order Now</button>
                </div>
            </div>} */}
                <div className='bg-white  w-72 py-8 px-5 rounded-xl '>
                    <h1 className='text-2xl font-semibold mb-5'>ADVERTISEMENT</h1>
                    <img src="https://marketplace.foodotawp.com/wp-content/uploads/2021/03/sd.png" alt="" />
                </div>
                <div className='bg-white  w-72 h-fit py-8 px-5 rounded-xl '>
                    <h1 className='text-2xl font-semibold '>Latest Product</h1>
                    <p className='text-4xl text-yellow-500 font-bold -mt-5'>_______ _ _</p>
                    <div className='flex flex-col gap-y-4 border-2 px-5 mt-3 rounded-xl'>
                        <img src={latest?.image} alt="" />
                        <div className="flex gap-1 items-center text-gray-300">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                        <h1 className='text-xl font-semibold'>{latest?.name}</h1>
                        <p className='font-semibold text-lg text-yellow-500'>&#8377; {latest?.price}</p>
                        <button onClick={() => dispatch(addCart(latest))} className='py-3 px-12 w-auto mx-auto  bg-yellow-500 hover:bg-black hover:text-white'>Order Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Restaurant