import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loadData } from "./services/loadData"

// TODO: create async thunk for loading data from API 
export const loadHomePageData = createAsyncThunk('homePage/loadHomePageData', async ()=>{
    const response = await loadData()
    console.log("From loadHomePageData async thunk:", { response })
    return response.data
})

const homepageInitialState = {
    homePageData : null,
    status : 'idle',
    error : null
}
export const homePageSlice = createSlice({
    name : "homePage",
    initialState : homepageInitialState,
    reducers : {
        resetStatus : ( state ) => {
            state.homePageData = null
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers : {
        [ loadHomePageData.pending ] : ( state ) => {
            state.status = 'loading'
            state.error = null
        },
        [ loadHomePageData.fulfilled ] : ( state, action ) => {
            console.log("from loadHomePageData in extraReducers: ", action.payload )
            state.homePageData = action.payload.homePageData
            state.status = 'fulfilled'
        },
        [ loadHomePageData.rejected ] : ( state ) => {
            state.status = state.error = 'error'
        }
    }
})

export const  { resetStatus } = homePageSlice.actions
export default homePageSlice.reducer