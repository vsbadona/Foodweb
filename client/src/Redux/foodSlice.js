import { createSlice } from "@reduxjs/toolkit";
import { filterSeller, findCategories,deleteCategory, findMyOrders, findRestaurant, findSeller, loginUser, orderNow, registerUser, updateProfile, updateCategory, createCategory, createProduct, findProduct, updateProduct, deleteProduct, loginSeller, findSellerOrders, manageOrders, addCategory, removeCategory, registerDelivery, registerSeller, loginDelivery, findOrders, manageOrderDelivery, updatedeliveryProfile, updatesellerProfile } from "./CRUDUser";



const initialState = {
    cart: false,
    userData: [],
    login: false,
    orders: [],
    restaurants: [],
    seller: [],
    role: "",
    register: false,
    category: "",
    categories: [],
    cartItems: [],
    createCateg: false,
    filteredSeller: [],
    products: [],
    delivery : []
}

const foodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {
        toogleCart(state, action) {
            if (state.cart === false) {
                state.cart = true
            } else {
                state.cart = false
            }
        },
        toogleCategory(state, action) {
            if (state.createCateg === false) {
                state.createCateg = true
            } else {
                state.createCateg = false
            }
        },
        registerSuccess(state,action){
state.register = true
        },
        checkLogin(state, action) {
            const auth = localStorage.getItem("login")
            const role = localStorage.getItem("role")
            if (auth && role === "user") {
                const Data = localStorage.getItem("user")
                const response = JSON.parse(Data)
                if (response?._id) {
                    state.login = true
                    state.role = "user"
                    state.userData = response
                } else {
                    state.login = false
                }
            } else {
                if (auth && role === "restaurant") {
                    const Data = localStorage.getItem("seller")
                    const response = JSON.parse(Data)
                    if (response?._id) {
                        state.login = true
                        state.role = "restaurant"
                        state.userData = response
                    } else {
                        state.login = false
                    }
                }else{
                    if (auth && role === "delivery") {
                        const Data = localStorage.getItem("delivery")
                        const response = JSON.parse(Data)
                        if (response?._id) {
                            state.login = true
                            state.role = "delivery"
                            state.userData = response
                        } else {
                            state.login = false
                        }
                    }
                }
            }
        },

        logoutUser(state, action) {
            localStorage.removeItem("user") || localStorage.removeItem("seller") || localStorage.removeItem("delivery")
            state.login = false
            state.userData = {}
            state.role = " "
            state.login = false
        },
        selectCategory(state, action) {
            const category = action.payload
            state.category = category
        },
        addCart(state, action) {
            const { name, image, price, quantity, sellerId } = action.payload
            const id = Math.floor(Math.random() * 1600)
            const items = JSON.parse(localStorage.getItem("cart")) || []
            const newItems = {
                name, image, price, quantity, id, sellerId
            }
            const updatedItems = [...items]
            updatedItems.push(newItems)
            state.cartItems = updatedItems
            localStorage.setItem("cart", JSON.stringify(updatedItems))
        },
        checkCart(state, action) {
            const cartItems = JSON.parse(localStorage.getItem("cart")) || []
            state.cartItems = cartItems
        },
        clearCart(state, action) {
            localStorage.removeItem("cart")
            state.cartItems = []
        },
        removeItem(state, action) {
            const { id } = action.payload
            const cartItems = JSON.parse(localStorage.getItem("cart"))
            const allItems = [...cartItems]
            const updatedItems = allItems.filter(i => i.id !== id)
            console.log(updatedItems);
            localStorage.setItem("cart", JSON.stringify(updatedItems));
            state.cartItems = updatedItems

        },
        updateCart(state, action) {
            const { id, name, image, price, quantity, sellerId } = action.payload
            const product = {
                id, name, image, price, quantity, sellerId
            }
            const values = JSON.parse(localStorage.getItem("cart"))
            const newTodos = [...values];
            const index = newTodos.findIndex(item => item.id === id)
            newTodos[index] = product;
            localStorage.setItem("cart", JSON.stringify(newTodos));
            state.cartItems = newTodos
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.success) {
                    const { data } = action.payload
                    state.userData = data
                    state.login = true
                    state.role = "user"
                    localStorage.setItem("login", true)
                    localStorage.setItem("role", "user")
                    localStorage.setItem("user", JSON.stringify(data))
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                        state.login = false
                    } else {
                        window.alert(action.payload.error)
                        state.login = false
                    }
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                if (action.payload?.success) {
                    localStorage.removeItem("user")
                    const { data } = action.payload
                    state.userData = data
                    localStorage.setItem("user", JSON.stringify(data))
                    window.alert(action.payload.success)
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    } else {
                        window.alert(action.payload.error)
                    }
                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.register = true
                }
                window.alert(action.payload.success || action.payload.alert || action.payload.error)
            })
            .addCase(registerUser.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(findMyOrders.fulfilled, (state, action) => {
                state.orders = action.payload
            })
            .addCase(findMyOrders.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(findRestaurant.fulfilled, (state, action) => {
                state.restaurants = action.payload
            })
            .addCase(findRestaurant.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(findSeller.fulfilled, (state, action) => {
                state.userData = action.payload
                
            })
            .addCase(findSeller.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(findCategories.fulfilled, (state, action) => {
                state.categories = action.payload
            })
            .addCase(findCategories.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(orderNow.fulfilled, (state, action) => {
                if (action.payload.success) {
                    window.alert(action.payload.success)
                    localStorage.removeItem("cart")
                    state.cartItems = []
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    } else {
                        window.alert(action.payload.error)
                    }
                }
            })
            .addCase(orderNow.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(filterSeller.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.filteredSeller = action.payload.success
                }
            })
            .addCase(filterSeller.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.categories = action.payload.data
                    // window.alert(action.payload.success)
                } else {
                    window.alert(action.payload.alert)
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.categories = action.payload.data
                    // window.alert(action.payload.success)
                } else {
                    window.alert(action.payload.alert)
                }
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.categories = action.payload.data
                    // window.alert(action.payload.success)
                } else {
                    window.alert(action.payload.alert)
                }
            })
            .addCase(createCategory.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.products = action.payload.data
                    // window.alert(action.payload.success)
                } else {
                    window.alert(action.payload.alert)
                }
            })
            .addCase(createProduct.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(findProduct.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.products = action.payload.success
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    }
                }
            })
            .addCase(findProduct.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.products = action.payload.product
                    // window.alert(action.payload.success)
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    }
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.products = action.payload.product
                    // window.alert(action.payload.success)
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    } else {
                        window.alert(action.payload.error)
                    }
                }
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(registerSeller.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.register = true
                }
                window.alert(action.payload.success || action.payload.alert || action.payload.error)
            })
            .addCase(registerSeller.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(loginSeller.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.userData = action.payload.data
                    state.login = true
                    state.role = "restaurant"
                    localStorage.setItem("login", true)
                    localStorage.setItem("role", "restaurant")
                    localStorage.setItem("seller", JSON.stringify(action.payload.data))
                    window.alert(action.payload.success)
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    } else {
                        window.alert(action.payload.error)
                    }
                }
            })
            .addCase(loginSeller.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(updatesellerProfile.fulfilled, (state, action) => {
                if (action.payload?.success) {
                    localStorage.removeItem("seller")
                    const { data } = action.payload
                    state.userData = data
                    localStorage.setItem("seller", JSON.stringify(data))
                    window.alert(action.payload.success)
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    } else {
                        window.alert(action.payload.error)
                    }
                }
            })
            .addCase(updatesellerProfile.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(findSellerOrders.fulfilled, (state, action) => {
                if (action.payload.alert) {
                    window.alert(action.payload.alert)
                } else {
                    state.orders = action.payload
                }
            })
            .addCase(findSellerOrders.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(manageOrders.fulfilled, (state, action) => {
                if (action.payload.success) {
                    window.alert(action.payload.success)
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    } else {
                        window.alert(action.payload.error)
                    }
                }
            })
            .addCase(manageOrders.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(addCategory.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.userData = action.payload.success
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    } else {
                        window.alert(action.payload.error)
                    }
                }
            })
            .addCase(addCategory.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(removeCategory.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.userData = action.payload.success
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    } else {
                        window.alert(action.payload.error)
                    }
                }
            })
            .addCase(removeCategory.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(registerDelivery.fulfilled, (state, action) => {
                if (action.payload.success) {
                    window.alert(action.payload.success)
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    } else {
                        window.alert(action.payload.error)
                    }
                }
            })
            .addCase(registerDelivery.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(loginDelivery.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.delivery = action.payload.data
                    state.login = true
                    state.role = "delivery"
                    localStorage.setItem("login", true)
                    localStorage.setItem("role", "delivery")
                    localStorage.setItem("delivery", JSON.stringify(action.payload.data))
                    window.alert(action.payload.success)
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    } else {
                        window.alert(action.payload.error)
                    }
                }
            })
            .addCase(loginDelivery.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(findOrders.fulfilled, (state, action) => {
                if (action.payload.success) {
                   state.orders = action.payload.success
                } else {
                   window.alert(action.payload.alert)
                }
            })
            .addCase(findOrders.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(manageOrderDelivery.fulfilled, (state, action) => {
                if (action.payload.success) {
                   window.alert(action.payload.success)
                } else {
                  if(action.payload.alert){
                    window.alert(action.payload.alert)
                  }else{
                    window.alert(action.payload.error)
                  }
                }
            })
            .addCase(manageOrderDelivery.rejected, (state, action) => {
                window.alert(action.error.message)
            })
            .addCase(updatedeliveryProfile.fulfilled, (state, action) => {
                if (action.payload?.success) {
                    localStorage.removeItem("delivery")
                    const { data } = action.payload
                    state.userData = data
                    localStorage.setItem("delivery", JSON.stringify(data))
                    window.alert(action.payload.success)
                } else {
                    if (action.payload.alert) {
                        window.alert(action.payload.alert)
                    } else {
                        window.alert(action.payload.error)
                    }
                }
            })
            .addCase(updatedeliveryProfile.rejected, (state, action) => {
                window.alert(action.error.message)
            })
    }
})

export default foodSlice.reducer
export const { toogleCart,registerSuccess, toogleCategory, checkLogin, logoutUser, selectCategory, addCart, checkCart, clearCart, removeItem, updateCart } = foodSlice.actions