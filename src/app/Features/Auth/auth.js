import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser } from "./services/authServices";
import { Notification } from "../../../Components";
import { ActionTypes } from "../../../Utils/ActionConstants";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginUser(email, password);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        data: err.response.data,
        status: err.response.status,
      });
    }
  }
);

export const guestLogin = createAsyncThunk(
  "auth/guestLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await loginUser(email, password);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        data: err.response.data,
        status: err.response.status,
      });
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const response = await signupUser(firstName, lastName, email, password);
      return response.data;
    } catch (err) {
      return rejectWithValue({
        data: err.response.data,
        status: err.response.status,
      });
    }
  }
);

const authInitialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("id") || null,
  loggedInStatus: localStorage.getItem("token") ? "fulfilled" : "idle",
  guestLoginStatus : localStorage.getItem("token") ? "fulfilled" : "idle",
  loggedInError: null,
  signupStatus: "idle",
  signupError: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      state.token = null;
      state.userId = null;
      state.loggedInStatus = "idle";
      state.guestLoginStatus = "idle";
      state.loggedInError = null;
      Notification(ActionTypes.logoutSuccess, "Logout Successfull");
    },
    resetAuthStatus: (state) => {
      state.loggedInError = null;
      state.signupStatus = "idle";
      state.signupError = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loggedInStatus = "loading";
      state.loggedInError = null;
    },
    [login.fulfilled]: (state, action) => {
      const { token, userId } = action.payload;
      state.token = token;
      state.userId = userId;
      state.loggedInStatus = "fulfilled";
      localStorage.setItem("token", token);
      localStorage.setItem("id", userId);
      Notification(ActionTypes.loginSuccess, "Login Success");
    },
    [login.rejected]: (state, action) => {
      const { data, status } = action.payload;
      state.loggedInStatus = state.loggedInError = "error";
      if (status === 401) {
        Notification(ActionTypes.loginError, "Wrong Credentials!");
      } else {
        Notification(ActionTypes.loginError, data.message);
      }
    },
    [guestLogin.pending]: (state) => {
      state.guestLoginStatus = "loading";
      state.loggedInError = null;
    },
    [guestLogin.fulfilled]: (state, action) => {
      const { token, userId } = action.payload;
      state.token = token;
      state.userId = userId;
      state.guestLoginStatus = state.loggedInStatus = "fulfilled";
      localStorage.setItem("token", token);
      localStorage.setItem("id", userId);
      Notification(ActionTypes.loginSuccess, "Login Success");
    },
    [guestLogin.rejected]: (state, action) => {
      const { data, status } = action.payload;
      state.guestLoginStatus = state.loggedInStatus = state.loggedInError = "error";
      if (status === 401) {
        Notification(ActionTypes.loginError, "Wrong Credentials!");
      } else {
        Notification(ActionTypes.loginError, data.message);
      }
    },
    [signup.pending]: (state) => {
      state.signupStatus = "loading";
      state.signupError = null;
    },
    [signup.fulfilled]: (state, action) => {
      state.signupStatus = "fulfilled";
      Notification(ActionTypes.signupSuccess, "Signup Success");
    },
    [signup.rejected]: (state, action) => {
      const { data, status } = action.payload;
      state.signupStatus = state.signupError = "error";
      if (status === 409) {
        Notification(ActionTypes.signupError, "Accout already Exists!");
      } else {
        Notification(ActionTypes.signupError, data.message);
      }
    },
  },
});

export const { logout, resetAuthStatus } = authSlice.actions;
export default authSlice.reducer;
