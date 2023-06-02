import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin } from '../Redux/foodSlice'
import { addCategory, findCategories, removeCategory, updatedeliveryProfile } from '../Redux/CRUDUser'

const DeliveryProfile = () => {
    const deliveryData = useSelector(state => state.userData)
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(checkLogin()) // eslint-disable-next-line
    },[])

    const [profile, setProfile] = useState({
        image: deliveryData.image || "https://fooddesk.dexignlab.com/react/demo/static/media/no-img-avatar.8c84566a7ea4355ab04c.png",
        name: deliveryData.name || "",
        phone: deliveryData.phone || "",
        email: deliveryData.email || "",
        password:  "",
        location : deliveryData.location || "",
        _id : deliveryData._id || ""
    })
    const handleChange = (e) => {
        setProfile({...profile,[e.target.name]:e.target.value})
    }
    return (
        <div className='w-screen '>
            <div className='w-screen md:w-3/4   border-2 mx-auto pt-5 pb-20 px-8 mt-12'>
                <p className='text-xl  font-semibold'>Account</p>
                <p className='text-gray-500  my-5'>Profile Photo</p>
                <div className="flex items-center gap-x-5">
                    <img src={profile.image} alt="" className='w-24 h-24 object-contain' />
                    <input className='border-b-2' placeholder='Enter Image Url' type="url" value={profile.image} onChange={handleChange} name="image" id="" title=' dsadd' />
                </div>
                <p className='text-gray-500 text-semibold px-5 cursor-pointer'>Remove</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 h-fit">
                    <div>
                        <h1 className='text-semibold text-lg py-2'>Username</h1>
                        <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder='Enter Your Username' className='pl-3 w-full h-12 border-2 outline-none' />
                    </div>
                    <div>
                        <h1 className='text-semibold text-lg py-2'>Phone</h1>
                        <input type="number" name="phone" value={profile.phone} onChange={handleChange} placeholder='Enter Your Phone' className='pl-3 w-full h-12 border-2 outline-none' />
                    </div>
                    <div>
                        <h1 className='text-semibold text-lg py-2'>Email Address</h1>
                        <input type="email" name="email" value={profile.email} onChange={handleChange} placeholder='Enter Your Email' className='pl-3 w-full h-12 border-2 outline-none' />
                    </div>
                    <div>
                        <h1 className='text-semibold text-lg py-2'>Location</h1>
                        <input type="text" name="location" value={profile.location} onChange={handleChange} placeholder='Enter Your Location' className='pl-3 w-full h-12 border-2 outline-none' />
                    </div>
                    <div>
                        <h1 className='text-semibold text-lg py-2'>Password</h1>
                        <input type="password" name="password" value={profile.password} onChange={handleChange} placeholder='Enter Your New Password' className='pl-3 w-full h-12 border-2 outline-none' />
                    </div>
 
                </div>
                <button onClick={()=>dispatch(updatedeliveryProfile(profile))} className='text-white bg-yellow-500 py-3 mx-2 px-8 rounded-xl float-right my-4'>Save Changes</button>
            </div>
        </div>
    )
}

export default DeliveryProfile