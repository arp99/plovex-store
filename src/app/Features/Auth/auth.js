import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { loginUser, signupUser } from "./services/authServices"

// TODO: Async thunk to fetch auth data from API
export const login = createAsyncThunk('auth/login' , async ( { email, password } )=>{
    const response = await loginUser( email, password )
    console.log("From login async thunk:", { response })
    return response.data
})

export const signup = createAsyncThunk('auth/signup', async ( { firstName, lastName, email, password })=>{
    const response = await signupUser(firstName, lastName, email, password)
    console.log("From signup user async thunk: ", { response })
    return response.data
})


const authInitialState = {
    token          : localStorage.getItem('token') || null,
    userId         : localStorage.getItem("id") || null,
    loggedInStatus : localStorage.getItem('token') ? 'fulfilled' : 'idle',
    loggedInError  : null,
    signupStatus   : 'idle',
    signupError    : null
}

export const authSlice = createSlice({
    name : 'auth',
    initialState : authInitialState,
    reducers : {
        logout : ( state ) => {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
            state.token = null
            state.userId = null
            state.loggedInStatus = 'idle'
            state.loggedInError = null
        },
        resetAuthStatus : ( state ) => {
            state.loggedInError = null
            state.signupStatus = 'idle'
            state.signupError = null
        }
    },
    extraReducers : {
        
        [ login.pending ] : ( state ) => {
            state.loggedInStatus = 'loading'
            state.loggedInError = null
        },
        [ login.fulfilled ] : ( state, action ) => {
            //once fulfilled the token will come in the action.payload
            console.log("From extra reducers in login:", action.payload )
            const { token, userId } = action.payload
            state.token = token
            state.userId = userId
            state.loggedInStatus = 'fulfilled'
            localStorage.setItem('token', token )
            localStorage.setItem('id', userId )
        },
        [ login.rejected ] : ( state ) => {
            state.loggedInStatus = state.loggedInError ='error'
        },
        [ signup.pending ] : ( state ) => {
            state.signupStatus = 'loading'
            state.signupError = null
        },
        [ signup.fulfilled ] : ( state, action ) => {
            console.log("From extra reducers in signup:", action.payload)
            state.signupStatus = 'fulfilled'
        },
        [ signup.rejected ] : ( state ) => {
            state.signupStatus = state.signupError = 'error'
        }
    }
})

export const { logout, resetAuthStatus } = authSlice.actions
export default authSlice.reducer