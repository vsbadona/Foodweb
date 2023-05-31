import React from 'react'
import HeroImage from "../Assets/Homepage.jpg"
import Delivery from "../Assets/Delivery.png"

const Hero = () => {
    return (
        <div style={{ backgroundImage: `url(${HeroImage})`, backgroundPosition: "center", backgroundSize: "Cover", backgroundRepeat: "no-repeat" }} className='h-auto pb-24 pt-12 bg-none md:bg-opacity-100'>
            <div className="flex justify-center lg:justify-start xs:w-auto lg:w-1/2 pt-24 ml-3 lg:ml-12">
            <div className="flex flex-col text-white gap-y-8 w-full md:w-3/4 lg:w-3/4 ">
            <div className="flex items-center text-gray-400 gap-x-5   ">
                    <p className='bg-yellow-700 bg-opacity-60 px-2 rounded-xl'>Easy Way To Order Your Food</p>
                    <img src={Delivery} alt="Delivery PNG" className='w-16 h-16' />
                </div>
                <h1 className='text-5xl font-extrabold'>Order Healthy And Fresh Food Anytime</h1>
                <h1>Italian Food makes people think of big family dinner. So you may want to position your restaurant as a place to bring the whole family.</h1>
                <div className="flex bg-white w-fit md:w-3/4 lg:w-full h-auto justify-between">
                    <div className="flex flex-col">
                        <label className='text-black font-semibold family-sans ml-3 mt-2'>Search Keywords</label>
                        <input type="text" placeholder='Recipe Name Here!' className="outline-none text-black pl-3" />
                    </div>
                    <button className='text-black px-5 py-3 text-2xl bg-yellow-500 mx-2 my-1 '><i className="fa fa-magnifying-glass"></i></button>
                </div>
                <div className="flex flex-col gap-y-12 ">
                    <h1 className='font-bold text-2xl font-serif'>Popular Restaurants</h1>
                    <div className="flex gap-x-8 md:gap-x-5 items-center overflow-x-auto ">

                            <img src="https://marketplace.canva.com/EAESMsqG9rI/3/0/1600w/canva-grey-%26-green-elegant-minimal-good-taste-food-restaurant-logo-jeSR74GRMC8.jpg" className='min-w-fit w-20 h-20  ' alt="" />

                            <img src="https://marketplace.canva.com/EAESMsqG9rI/3/0/1600w/canva-grey-%26-green-elegant-minimal-good-taste-food-restaurant-logo-jeSR74GRMC8.jpg" className='min-w-fit w-20 h-20  ' alt="" />

                            <img src="https://marketplace.canva.com/EAESMsqG9rI/3/0/1600w/canva-grey-%26-green-elegant-minimal-good-taste-food-restaurant-logo-jeSR74GRMC8.jpg" className='min-w-fit w-20 h-20  ' alt="" />

                            <img src="https://marketplace.canva.com/EAESMsqG9rI/3/0/1600w/canva-grey-%26-green-elegant-minimal-good-taste-food-restaurant-logo-jeSR74GRMC8.jpg" className='min-w-fit w-20 h-20  ' alt="" />

                            <img src="https://marketplace.canva.com/EAESMsqG9rI/3/0/1600w/canva-grey-%26-green-elegant-minimal-good-taste-food-restaurant-logo-jeSR74GRMC8.jpg" className='min-w-fit w-20 h-20  ' alt="" />

                    </div>
                </div>
             </div>
            </div>
        </div>
    )
}

export default Hero