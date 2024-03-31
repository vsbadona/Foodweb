import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkLogin } from '../Redux/foodSlice'
import { addCategory, filterSeller, findCategories, findSeller, removeCategory } from '../Redux/CRUDUser'
import axios from 'axios'

const RestroProfile = () => {
    const sellerData = useSelector(state => state.userData)
    const categories = useSelector(state => state.categories)
    const [category,setCategory]=useState("")
 

    const [profile, setProfile] = useState({
        image:  null,
        name: sellerData.name || "",
        phone: sellerData.phone || "",
        email: sellerData.email || "",
        password:  "",
        logoimage :sellerData.logoimage || "",
        location : sellerData.location || "",
        _id : sellerData._id || ""
    })
    const handleChange = (e) => {
        setProfile({...profile,[e.target.name]:e.target.value})
    }

    const dispatch = useDispatch()
    useEffect(()=>{
     
      dispatch(checkLogin())
      dispatch(findCategories()) // eslint-disable-next-line
    },[])
    const doda = () => {
        const checkSeller = dispatch(findSeller(sellerData._id))
        console.log(checkSeller);
    }
    return (
        <div className='w-screen '>
            <div className='w-screen md:w-3/4   border-2 mx-auto pt-5 pb-20 px-8 mt-12'>
                <p className='text-xl  font-semibold'>Account</p>
                <p className='text-gray-500  my-5'>Profile Photo</p>
                <div className="flex items-center gap-x-5">
                {profile.image == null && <img src={`${process.env.REACT_APP_API}/${sellerData.image}`} alt="" className='w-24 h-24 object-contain' />}
                    {profile.image!=null && <img src={URL.createObjectURL(profile.image)} alt="" className='w-24 h-24 object-contain' />}
                    <input className='border-b-2'  type="file"  onChange={(e)=>setProfile({...profile,image:e.target.files[0]})} name="image" id="" title=' dsadd' />
                </div>
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
                        <h1 className='text-semibold text-lg py-2'>Logo Image</h1>
                        <input type="text" name="logoimage" value={profile.logoimage} onChange={handleChange} placeholder='Enter Your Logo Image' className='pl-3 w-full h-12 border-2 outline-none' />
                    </div>
                    <div>
                        <h1 className='text-semibold text-lg py-2'>Location</h1>
                        <input type="text" name="location" value={profile.location} onChange={handleChange} placeholder='Enter Your Location' className='pl-3 w-full h-12 border-2 outline-none' />
                    </div>
                    <div>
                        <h1 className='text-semibold text-lg py-2'>Password</h1>
                        <div className="flex itsms-center justify-between"><input type="password" name="password" value={profile.password} onChange={handleChange} placeholder='Enter Your New Password' className='pl-3 w-full h-12 border-2 outline-none' />
                        <button className='bg-orange-500 p-3 rounded-lg text-white' onClick={async()=>{
                            const id=profile._id
                            const password = profile.password;
                            const data = await axios.post(`${process.env.REACT_APP_API}/seller/updatepassword`,{id,password})
                           const val = data.data
                           if(val.success){
                            window.alert(val.success)
                           }else{
                            window.alert(val.alert);
                           }
                        }
                        }><i className="fa fa-edit"></i></button>
                        </div>
                       
                    </div>
                    <div className=''>
                        <h1 className='text-semibold text-lg py-2'>Categories</h1>
                       <div className="flex items-center gap-x-2">
                       <select name="categories" id="" onChange={(e)=>setCategory(e.target.value)} placeholder='Select Category' className='pl-3 w-full text-black h-12 border-2 outline-none bg-white'>
                        {/* <option value=""></option> */}
                        {categories?.length>=1 && categories?.map((category)=>
                        <option key={Math.random()} value={category.name}>{category.name}</option>
                        )}
                    </select>
                    <button onClick={()=>{dispatch(addCategory({_id:sellerData._id,category:{name:category}}));dispatch(checkLogin())}} className='text-white bg-yellow-500 w-56 py-3 mx-2  rounded-xl  my-4' >Save Category</button>

                       </div>
                     
                    </div>
 
                </div>
                
                <div className="w-full h-fit flex flex-wrap items-center gap-x-5">
                   {sellerData?.categories?.length >=1 && sellerData?.categories?.map((category) => {
                    return(
                        <h1 className=' font-semibold rounded-lg bg-gray-100 p-1'><button onClick={()=>{dispatch(removeCategory({_id:sellerData._id,id:category._id}));dispatch(checkLogin())}} className='text-red-500 text-lg'><i className="fa fa-multiply"></i></button>{category.name}</h1>
                    )
                   })}
                </div>
                
                <button disabled={!profile.name  || !profile.image || !profile.email || !profile.phone || !profile.logoimage || !profile.location } onClick={async(e)=>{
                     e.preventDefault();
                      if(profile.name && profile.image && profile.email && profile.logoimage && profile.location && profile.phone){
                        const formData = new FormData();
                        formData.append('name',profile.name);
                        formData.append('email',profile.email);
                        formData.append('phone',profile.phone);
                        formData.append('image',profile.image);
                        formData.append('location',profile.location);
                        formData.append('logoimage',profile.logoimage);
                        formData.append('_id',profile._id);
                        const data = await axios.post(`${process.env.REACT_APP_API}/seller/editprofile`, formData)
                        const dat = data.data;
                        if(dat.success){
                            dispatch(findSeller(sellerData?._id))
                            alert(dat.success)
                        }else{
                            alert(dat.alert)
                        }
                        // dispatch(updatesellerProfile(formDataJson));
                      }}}
                     className='disabled:bg-yellow-200 text-white bg-yellow-500 py-3 mx-2 px-8 rounded-xl float-right my-4'>Save Changes</button>
            </div>
        </div>
    )
}

export default RestroProfile