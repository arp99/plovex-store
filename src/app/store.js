import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Features/Auth/auth"
import homepageReducer from "./Features/HomePage/homePage"

export const store  = configureStore({
    reducer : {
        auth : authReducer,
        homePage : homepageReducer,
    }
})