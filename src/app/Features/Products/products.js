import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fecthNewReleases, fetchProductByBrand, fetchProductByCategory } from "./services/productFetchServices"

export const loadNewProducts = createAsyncThunk('product/loadNewProducts', async ()=> {
    const response = await fecthNewReleases()
    console.log("From loadNewProducts async thunk:", { response })
    return response.data
})

export const loadCategory = createAsyncThunk('product/loadCategory', async ({ category }) =>{
    console.log(category)
    const response = await fetchProductByCategory(category)
    console.log("From loadCategory async thunk:",{ response })
    const responseData = response.data
    return {
        category,
        responseData
    }
})

export const loadBrand = createAsyncThunk('product/loadBrand', async ({ brand }) => {
    console.log(brand)
    const response = await fetchProductByBrand(brand)
    console.log("From loadBrand async thunk:", { response })
    const responseData = response.data
    return {
        brand,
        responseData
    }
})

const productsInitialState = {
    new_releases : [],
    category : {},
    brand : {},
    productFetched : "idle",
    productFetchError : null
}

export const productsSlice = createSlice({
    name : "prouduct",
    initialState : productsInitialState,
    reducers : {
        // TODO: Create reducers for the products 
        // Eg: Load products data , fetch data by Brand, filter data
        // here the local filters like, filter by price, filter by fast delivery, sort alphabetically will be there
        resetProducts : ( state ) =>{
            state.new_releases = []
            state.category = {}
            state.brand = {}
            state.productFetched = "idle"
            state.productFetchError = null
        }
    },
    extraReducers : {
        //here the async loaders for fetching products of different filter type will be there
        [ loadCategory.pending ] : ( state ) => {
            state.productFetched = 'loading'
            state.productFetchError = null
        },
        [ loadCategory.fulfilled ] : ( state, action ) => {
            console.log("From loadCategory extraReducers: ", action.payload)
            const { category, responseData } = action.payload
            state.category[category] = responseData.data
            state.productFetched = 'fulfilled'
        },
        [ loadCategory.rejected ] : ( state ) => {
            state.productFetched = state.productFetchError = 'error'
        },
        [ loadNewProducts.pending ] : ( state ) => {
            state.productFetched = 'loading'
            state.productFetchError = null
        },
        [ loadNewProducts.fulfilled ] : ( state, action ) => {
            console.log("from loadNewProducts extra reducers:", action.payload)
            state.new_releases = action.payload.data
            state.productFetched = 'fulfilled'
        },
        [ loadNewProducts.rejected ] : ( state ) => {
            state.productFetched = state.productFetchError = 'error'
        },
        [ loadBrand.pending ] : ( state ) => {
            state.productFetched = 'loading'
            state.productFetchError = null
        },
        [ loadBrand.fulfilled ] : ( state, action ) => {
            const { brand, responseData } = action.payload
            state.brand[brand] = responseData.data
            state.productFetched = 'fulfilled'
        },
        [ loadBrand.rejected ] : ( state ) => {
            state.productFetched = state.productFetchError = 'error'
        }
    }
})

export const  { resetProducts } = productsSlice.actions
export default productsSlice.reducer