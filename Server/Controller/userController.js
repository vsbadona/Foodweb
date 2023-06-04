import Category from "../models/categorySchema.js";
import Order from "../models/orderSchema.js";
import { Seller } from "../models/sellerSchema.js";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs"

export const registerUser = async (req, res) => {
    const { name, email, phone, password,image } = req.body
    if (name && email && phone && password && image) {
        // Check If given email or phone number already exists
        const checkUnique = await User.findOne({ email: email }) || await User.findOne({ phone: phone })
        if (checkUnique) {
            res.json({ alert: "Email Or Mobile Number Already Exists" })
        } else {
            // check that passsword contains more than 6 letters
            if (password.length < 6) {
                res.json({ alert: "Password Too Short" })
            } else {
                const pwdtoken = await bcrypt.hash(password, 12)
                // Create New User
                const Register = await new User({
                    name: name,
                    email: email,
                    password: pwdtoken,
                    phone: phone,
                    image : image
                })
                if (Register) {
                    res.json({ success: "User Registered Successfully" })
                    Register.save()
                } else {
                    res.json({ error: "Something Went Wrong" })
                }
            }
        }
    } else {
        res.json({ alert: "All Fields Are Required" })
    }
}

export const loginUser = async (req, res) => {
    const { phone, password } = req.body
  const bb = await bcrypt.hash(password , 12)
  const cc = await bcrypt.decodeBase64(bb)
  res.json(bb,cc)
}

export const updateProfile = async(req,res) => {
    const {userId,name,image,email,phone,password}=req.body
 bcrypt.encodeBase64(password , 12)
    try {
        const findUser = await User.findById(userId);
    
        if (findUser) {
          const pwdToken = await bcrypt.hash(password, 12);
          findUser.name = name;
          findUser.image = image;
          findUser.email = email;
          findUser.phone = phone;
          findUser.password = pwdToken;
    
          const updatedUser = await findUser.save();
          res.json({success : "profile updated", data :updatedUser});
        } else {
          res.json({ alert: "Login Again To Continue" });
        }
      } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the profile." });
      }
    
}

export const userOrder = async (req, res) => {
    const { userId, userAddress, sellerId, products,total } = req.body
    const findUser = await User.findById(userId)
    if (findUser) {
        const {name,image,phone} = findUser
        const findSeller = await Seller.findById(sellerId)
        if (findSeller) {
            const orderNow = await new Order({
                userId,total:total,userName:name,userImage:image,userPhone:phone, userAddress, sellerName:findSeller.name,sellerId, products
            })
            if (orderNow) {
                await orderNow.save()
                res.json({ success: "Order Success" })
            } else {
                res.json({ error: "An Error Occureed" })
            }
        } else {
            res.json({ alert: "Seller Not Found" })
        }
    } else {
        res.json({ alert: "Please Login Agian To Continue" })
    }

}


export const myOrders = async(req,res) => {
  const {_id}= req.query
    const findOrders = await Order.find()
    const findMyOrder = findOrders.filter(order => order.userId == _id)
    res.json(findMyOrder)
}

export const nearRestaurants = async(req,res) => {
 try {
    const sellers = await Seller.find()
    res.json(sellers)
 } catch (error) {
    console.log(error);
 }
  }

  export const findSeller = async(req,res) => {
    const {_id} = req.query
    const seller = await Seller.findById(_id)
    res.json(seller)
  }
  export const findCategories = async(req,res) => {
   const categories = await Category.find()
   res.json(categories)
  }

  export const filterRestautant = async(req,res) => {
    const categories = req.body
    const names = categories[0]
    try {
        const findSellers = await Seller.find({
          categories: { $elemMatch: { name: names } }
        });
        res.json({success : findSellers});
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while filtering restaurants.' });
      }
  }


