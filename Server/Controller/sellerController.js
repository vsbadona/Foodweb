import Category from "../models/categorySchema.js";
import Order from "../models/orderSchema.js";
import { Seller } from "../models/sellerSchema.js";
import bcrypt from "bcryptjs"

export const registerSeller = async (req, res) => {
    const { name, email, phone, password, location,image} = req.body
    // if (name && email && phone && password && location  && image) {
        // Check If given email or phone number already exists
        const checkUnique = await Seller.findOne({ email: email }) || await Seller.findOne({ phone: phone })
        if (checkUnique) {
            res.json({ alert: "Email Or Mobile Number Already Exists" })
        } else {
            // check that passsword contains more than 6 letters
            if (password.length < 6) {
                res.json({ alert: "Password Too Short" })
            } else {
                const pwdtoken = await bcrypt.hash(password, 12)
                let Image = '';
                // Create New Seller
                const mail = email.toLowerCase()
                if (req.file) {
                    Image = req.file.path;
                }
                const Register = await new Seller({
                    name: name,
                    email: mail,
                    password: pwdtoken,
                    phone: phone,
                    image : Image,
                    location: location
                })
                if (Register) {
                    res.json({ success: "Seller Registered Successfully" })
                    Register.save()
                } else {
                    res.json({ error: "Something Went Wrong" })
                }
            }
        }
   
}

export const addCategory = async (req,res) => {
    const {category,_id}=req.body
 try {
        const seller = await Seller.findById(_id);
    
        if (!seller) {
          return res.status(404).json({ error: 'Seller not found' });
        }
    
        seller.categories.push(category);
        await seller.save();
    
        return res.json({success : seller});
 } catch (error) {
    res.json({error : error.message})
 }
}
export const removeCategory = async (req,res) => {
    const {id,_id}=req.body
    try {
        const seller = await Seller.findById(_id);
    
        if (!seller) {
          return res.status(404).json({ error: 'Seller not found' });
        }
    
        const categoryIndex = seller.categories.findIndex(state => state._id == id);
    
        if (categoryIndex === -1) {
          return res.status(404).json({ error: 'Category not found' });
        }
    
        seller.categories.splice(categoryIndex, 1);
        await seller.save();
    
        return res.json({success : seller});
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
      }
}

export const loginSeller = async (req, res) => {
    const { phone, password } = req.body
    if (phone && password) {
        const findSeller = await Seller.findOne({ phone: phone })
        if (findSeller) {
            const checkPassword = await bcrypt.compare(password, findSeller.password)
            if (checkPassword) {
                res.json({ success: "Login Success", data: findSeller })
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

export const createProduct = async (req, res) => {
    const { sellerId, name, image, price, description, category } = req.body
    if (!sellerId) {
        res.json({ alert: "Please Login Again To Continue" })
    }
    else {
        const findSeller = await Seller.findById(sellerId)
        if (findSeller) {
            if (name && image && price && description && category) {
                const product = {
                    name: name,
                    image: image,
                    price: price,
                    description: description,
                    category: category
                }
                findSeller.products = await findSeller.products.concat(product)
                await findSeller.save();
                res.json({ success: "Product Created" ,data:findSeller.products})
            } else {
                res.json({ alert: "All Fields Are Required" })
            }
        } else {
            res.json({ alert: "Invalid User , Please Login Again" })
        }
    }
}

export const editProduct = async (req, res) => {
    const { id, product_id, name, image, price, description, category } = req.body
    if (!product_id) {
        res.json({ alert: "invalid! product" })
    } else {
        if (!id) {
            res.json({ alert: "Please Login Again To Continue" })
        }
        else {
            const findSeller = await Seller.findById(id)
            let product = {
                name: name,
                description: description,
                image: image,
                price: price,
                category: category,
                _id: product_id
            };
            if (findSeller) {
                const indexx = await findSeller.products.findIndex(product => product._id == product_id)
                findSeller.products[indexx] = product
                await findSeller.save()
                res.json({ success: "Product Updated", product: findSeller.products })
            } else {
                res.json({ alert: "Invalid User" })
            }
        }
    }
}

export const deleteProduct = async (req, res) => {
    const { id, product_id } = req.query
    // Find User By Id
    const findSeller = await Seller.findById(id)
    if (findSeller) {
        // check product in seller product list
        const allProducts = findSeller.products;
        const findproduct = await allProducts.findIndex(product => product._id == product_id)
        if (findproduct>=0) {
            // filter product from product list
            const del = findSeller.products.filter(product => product._id != product_id)
            findSeller.products = del
            // save filtered list
            const deleted = findSeller.save()
            if (deleted) {
                res.json({ success: "Product Deleted" , product : findSeller.products })
            } else {
                res.json({ error: "Can't Delete" })
            }
        } else {
            res.json({ alert: "Product Not Found" })
        }

    } else {
        res.json({ alert: " Login Again To Continue" })
    }
}

export const findProduct = async (req,res) => {
    const {_id} = req.query
    const find = await Seller.findById(_id)
    if(find){
        if(find?.products.length >= 1){
           res.json({success:find.products})
            }
        }
    else{
        res.json({alert : "Seller Not Found"})
    }
}

export const getSeller = async (req, res) => {
    const findSeller = await Seller.find();
    res.json({ seller: findSeller })
}

export const findOrder = async (req, res) => {
    const { sellerID } = req.query;
    const findSeller = await Seller.findById(sellerID)
    if (findSeller) {
const order = await Order.find({sellerId : sellerID})
if(order.length!==0){
    res.json(order)
}else{
    res.json({alert:"Yuohh No Order Found"})
}
}else{
    res.json({alert:"Invalid! User"})
}
}

export const manageOrder = async(req,res) => {
    const {_id,status}=req.query
const findOrder = await Order.updateOne({_id:_id},{status:status})
if(findOrder){
    if (findOrder.modifiedCount === 1) {
        res.json({success:"The status was updated successfully."});
      } else {
        res.json({error:"Can't Update Status"})
      }
}else{
    res.json({alert:"Order Not Found"})
}

}


export const createCategory = async(req,res) => {
    const {name,image,sellerId} = req.query
    const CategoryName = await name.toUpperCase()

    const existingData = await Category.findOne({name:CategoryName})
    if(existingData){
        res.json({alert:"Category Already Exists"})
    }
    else{
        const createCategory = await new Category({
            name : CategoryName,
            image : image,
            // creatorId : sellerId
        })
       
        if(createCategory){
    await createCategory.save()
    const categories = await Category.find()
    res.json({success:"Category Created",data:categories})
        }else{
            res.json({alert:"Sorry"})
        }
    }
}
export const updateCategory = async(req,res) => {
    const {name,image,id} = req.body
const updatedCategory = {
    name ,image
}
   const findCategory = await Category.findByIdAndUpdate(id,updatedCategory, {new:true})
    .then(async(updatedItem) => {
        if (!updatedItem) {
          return res.status(404).json({ alert: 'Item not found' });
        }
       else{
        const findCateg = await Category.find()
        res.json({success:"Category Updated",data:findCateg});
       }
      })
      .catch((error) => {
        res.status(500).json({ error: 'Internal server error' });
      });

}
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;

        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ alert: 'Category not found' });
        }
        
        const remainingCategories = await Category.find();
        res.json({ success: "Category deleted", data: remainingCategories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updatePassword = async(req,res) => {
    const {id,password} = req.body;
    try {
        const findUser = await Seller.findById(id);
    
        if (findUser) {
          const pwdToken = await bcrypt.hash(password, 12);
           findUser.password = pwdToken;
    
          const updatedUser = await findUser.save();
          res.json({success : "password updated", data :updatedUser});
        } else {
          res.json({ alert: "Login Again To Continue" });
        }
      } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the profile." });
      } 
}

export const updateProfile = async (req, res) => {
    const { _id, name, email, phone, location, logoimage } = req.body;
    let image = ''; // Initialize image variable

    try {
        const findUser = await Seller.findById(_id);

        // Check if user exists
        if (findUser) {
            // Check if req.file exists
            if (req.file) {
                image = req.file.path;
            }

            // Update user fields
            findUser.name = name;
            findUser.image = image;
            findUser.email = email;
            findUser.phone = phone;
            findUser.location = location;
            findUser.logoimage = logoimage;

            // Save updated user document
            const updatedUser = await findUser.save();

            // Return success response
            return res.status(200).json({ success: "Profile updated", data: updatedUser });
        } else {
            // User not found
            return res.status(404).json({ alert: "User not found" });
        }
    } catch (error) {
        // Log error for debugging
        console.error("Error updating profile:", error);

        // Return error response
        return res.status(500).json({ error: "An error occurred while updating the profile." });
    }
};
