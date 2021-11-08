import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Features/Auth/auth"

export const store  = configureStore({
    reducer : {
        auth : authReducer,
    }
})