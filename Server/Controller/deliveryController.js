import Delivery from "../models/deliverySchema.js";
import Order from "../models/orderSchema.js";

import bcrypt from "bcryptjs"

export const registerDelivery = async (req, res) => {
    const { name, image,email, phone, password, location } = req.body
    if (name && image && email && phone && password && location) {
        // Check If given email or phone number already exists
        const checkUnique = await Delivery.findOne({ email: email }) || await Delivery.findOne({ phone: phone })
        if (checkUnique) {
            res.json({ alert: "Email Or Mobile Number Already Exists" })
        } else {
            // check that passsword contains more than 6 letters
            if (password.length < 6) {
                res.json({ alert: "Password Too Short" })
            } else {
                const pwdtoken = await bcrypt.hash(password, 12)
                // Create New Delivery Boy
                const Register = await new Delivery({
                    name: name,
                    image:image,
                    email: email,
                    password: pwdtoken,
                    phone: phone,
                    location: location
                })
                if (Register) {
                    res.json({ success: "Delivery Boy Registered Successfully" })
                    Register.save()
                } else {
                    res.json({ error: "Something Went Wrong" })
                }
            }
        }
    } else {
        res.json({ alert: "All Fields Are Requires" })
    }
}

export const loginDelivery = async (req, res) => {
    const { phone, password } = req.body
    if (phone && password) {
        const findDelivery = await Delivery.findOne({ phone: phone })
        if (findDelivery) {
            const checkPassword = await bcrypt.compare(password, findDelivery.password)
            if (checkPassword) {
                res.json({ success: "Login Success", data: findDelivery })
            } else {
                res.json({ alert: "Password Is Incorrect" })
            }
        } else {
            res.json({ alert: "Mobile Number Is Not Registered" })
        }
    } else {
        res.json({ alert: "Mobile Number And Password Is Required" })
    }
}

export const getDelivery = async (req, res) => {
    const findDelivery = await Delivery.find();
    res.json({ delivery: findDelivery })
}

export const findOrder = async (req, res) => {
const order = await Order.find({deliveryId : undefined}) 
if(order.length!==0){
    res.json(order)
}else{
    res.json({alert:"Yuohh No Order Found"})
}
}

export const manageOrder = async(req,res) => {
    const {_id,status,deliveryId}=req.query
if(status == "Pickup"){
    const findOrder = await Order.updateMany({_id:_id},{status:status},{deliveryId:deliveryId})
    if(findOrder){
        if (findOrder.modifiedCount === 1) {
            res.json({success:"The status was updated successfully."});
       await Delivery.updateOne({_id:deliveryId} , {available : false})
        } else {
            res.json({error:"Can't Update Status"})
        }
    }
}else{
    const findOrder = await Order.updateOne({_id:_id},{status:status})
    if(findOrder){
        if (findOrder.modifiedCount === 1) {
            res.json({success:"The status was updated successfully."});
            await Delivery.updateOne({_id:deliveryId} , {available : true})
        } else {
            res.json({error:"Can't Update Status"})
        }
    }
}

}