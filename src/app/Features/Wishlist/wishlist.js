import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addProductToWishlist, getWishlistItems, removeProductFromWishlist } from "./services/WishlistServices"
import { Notification } from "../../../Components"
import { ActionTypes } from "../../../Utils/ActionConstants"


export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async({ productId, userId })=> {
    const response = await addProductToWishlist(productId, userId)
    return {
        responseData : response.data,
    }
})

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async({ productId, userId }) => {
    const response = await removeProductFromWishlist(productId, userId)
    return {
        responseData : response.data,
        productId
    }
})

export const fetchFomWishlist = createAsyncThunk('wishlist/fetchFomWishlist', async({ userId })=> {
    const response = await getWishlistItems(userId)
    console.log("Inside fetchFomWishlist async thunk: ", { response })
    return response.data
})


const wishlistInitialState = {
    products : [],
    productAddedStatus : 'idle',
    productRemoveStatus : 'idle',
    wishlistFetchStatus : 'idle',
    productAddedError : null,
    productRemoveError : null,
    wishlistFetchError : null
}

export const wishlistSlice = createSlice({
    name : "wishlist",
    initialState : wishlistInitialState,
    reducers : {
        resetWishlist : ( state ) => {
            state.products = []
            state.productAddedStatus = 'idle'
            state.productRemoveStatus = 'idle'
            state.wishlistFetchStatus = 'idle'
            state.productAddedError = null
            state.productRemoveError = null
            state.wishlistFetchError = null
        }
    },
    extraReducers : {
        [ addToWishlist.pending ] : ( state ) => {
            state.productAddedStatus = 'loading'
            state.productAddedError = null
        },
        [ addToWishlist.fulfilled ] : ( state, action ) => {
            const { responseData } = action.payload
            console.log("Inside addToWishlist extraReducers: ", responseData)
            state.products.push( responseData.product )
            state.productAddedStatus = 'fulfilled'
            Notification(ActionTypes.wishlistSuccess, "Added to Wishlist")
        },
        [ addToWishlist.rejected ] : ( state ) => {
            state.productAddedStatus = state.productAddedError = 'error'
            Notification(ActionTypes.wishlistError, "Failed to Add in Wishlist")
        },
        [ removeFromWishlist.pending ] : ( state ) => {
            state.productRemoveStatus = 'loading'
            state.productRemoveError = null
        },
        [ removeFromWishlist.fulfilled ] : ( state, action ) => {
            const { responseData, productId } = action.payload
            state.products = state.products.filter(product => product._id !== productId )
            console.log("Inside removeFromWishlist extraReducers: ", responseData)
            state.productRemoveStatus = 'fulfilled'
            Notification(ActionTypes.wishlistSuccess, "Removed from Wishlist")
        },
        [ removeFromWishlist.rejected ] : ( state ) => {
            state.productRemoveStatus = state.productRemoveError = 'error'
            Notification(ActionTypes.wishlistError, "Failed to remove")
        },
        [ fetchFomWishlist.pending ] : ( state ) => {
            state.wishlistFetchStatus = 'loading'
            state.wishlistFetchError = null
        },
        [ fetchFomWishlist.fulfilled ] : ( state, action ) => {
            console.log("Inside fetchFomWishlist extraReducers: ", action.payload)
            const { products } = action.payload.data
            state.products = products.map(({ productId }) => productId )
            state.wishlistFetchStatus = 'fulfilled'
        },
        [ fetchFomWishlist.rejected ] : ( state ) => {
            state.wishlistFetchStatus = state.wishlistFetchError = 'error'
        }
    }
})

export const { resetWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer