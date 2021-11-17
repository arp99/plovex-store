import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Features/Auth/auth"
import homepageReducer from "./Features/HomePage/homePage"
import productReducer from "./Features/Products/products"
import wishlistReducer from "./Features/Wishlist/wishlist"
import cartReducer from "./Features/Cart/Cart"

export const store  = configureStore({
    reducer : {
        auth : authReducer,
        homePage : homepageReducer,
        product : productReducer,
        wishlist : wishlistReducer,
        cart : cartReducer
    }
})