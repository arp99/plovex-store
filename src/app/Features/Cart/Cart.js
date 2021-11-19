import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addProductToCart, decreaseProductQuantity, getCartProducts, removeProductFromCart } from "./services/cartServices"

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, userId }) => {
    //so I need the token for authorization header, the userId and the productId to update cart
    const response = await addProductToCart( productId, userId )
    console.log("Inside addToCart async thunk: ", { response })
    return response.data        
})

export const decreaseQuantity = createAsyncThunk('cart/decreaseQuantity', async ({ productId, userId }) => {
    const response = await decreaseProductQuantity(productId, userId)
    console.log("Inside decreaseQuantity async thunk: ", { response })
    return response.data
})

export const removeProduct = createAsyncThunk('cart/removeProduct', async ({ productId, userId }) => {
    const response = await removeProductFromCart(productId, userId)
    console.log("Inside removeProduct async thunk: ", { response })
    return response.data
})

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems', async ({ userId }) => {
    const response = await getCartProducts(userId)
    console.log("Inside fetchCartItems async thunk: ", { response })
    return response.data
})


const cartInitialState = {
    products : [],
    cartUpdateStatus :'idle',
    cartFetchStatus : 'idle',
    cartUpdateError : null,
    cartFetchError : null
}

export const cartSlice = createSlice({
    name : "cart",
    initialState : cartInitialState,
    reducers : {
        // TODO: Create reducers for cart 
        // Eg: add to cart, update cart products, remove from cart, clear all cart
        resetCart : ( state ) => {
            state.products = []
            state.cartUpdateStatus = state.cartFetchStatus = 'idle'
            state.cartUpdateError = state.cartFetchError = 'error'
        }
    },
    extraReducers : {
        [ fetchCartItems.pending ] : ( state ) => {
            state.cartFetchStatus = 'loading'
            state.cartFetchError = null
        },
        [ fetchCartItems.fulfilled ] : ( state, action ) => {
            console.log("Inside fetchCartItems extraReducers : ", action.payload )
            const { products } = action.payload.data
            state.products = products.map(({ productId, quantity }) => {
                return {
                    product : productId,
                    quantity
                }
            })
            state.cartFetchStatus = 'fulfilled'
        },
        [ fetchCartItems.rejected ] : ( state ) => {
            state.cartFetchStatus = state.cartFetchError = 'error'
        },
        [ addToCart.pending ] : ( state ) => {
            state.cartUpdateStatus = 'loading'
            state.cartUpdateError = null
        },
        [ addToCart.fulfilled ] : ( state, action ) => {
            console.log("Inside addToCart extraReducers: ", action.payload )
            const { products } = action.payload.data
            state.products = products.map(({ productId, quantity }) => {
                return {
                    product : productId,
                    quantity
                }
            })
            state.cartUpdateStatus = 'fulfilled'
        },
        [ addToCart.rejected ] : ( state ) => {
            state.cartUpdateStatus = state.cartUpdateError = 'error'
        },
        [ decreaseQuantity.pending ] : ( state ) => {
            state.cartUpdateStatus = 'loading'
            state.cartUpdateError = null
        },
        [ decreaseQuantity.fulfilled ] : ( state, action ) => {
            console.log("Inside decreaseQuantity extraReducers: ", action.payload)
            const { products } = action.payload.data
            state.products = products.map(({ productId, quantity }) => {
                return {
                    product : productId,
                    quantity
                }
            })
            state.cartUpdateStatus = 'fulfilled'
        },
        [ decreaseQuantity.rejected ] : ( state ) => {
            state.cartUpdateStatus = state.cartUpdateError = 'error'
        },
        [ removeProduct.pending ] : ( state ) => {
            state.cartUpdateStatus = 'loading'
            state.cartUpdateError = null
        },
        [ removeProduct.fulfilled ] : ( state, action ) => {
            console.log("Inside removeProduct extraReducers: ", action.payload)
            const { products } = action.payload.data
            state.products = products.map(({ productId, quantity }) => {
                return {
                    product : productId,
                    quantity
                }
            })
            state.cartUpdateStatus = 'fulfilled'
        },
        [ removeProduct.rejected ] : ( state ) => {
            state.cartUpdateStatus = state.cartUpdateError = 'error'
        }
    }
})

export const { resetCart } = cartSlice.actions
export default cartSlice.reducer