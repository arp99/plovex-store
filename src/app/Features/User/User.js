import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserDataService } from "./services/userServices";

export const getUserData = createAsyncThunk("user/getUserData", async () => {
  const response = await getUserDataService();
  return response.data;
});

// export const addAddress = createAsyncThunk("user/addAddress", async ({ address }) => {
//   const response = await addAddressService()
//   return response.data
// })

const userInitialState = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  address: [],
  userDataStatus: "idle",
  userDataError: null,
  addAddressStatus: "idle",
  addAddressError: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    resetUser: (state) => {
      state.userId = "";
      state.firstName = "";
      state.lastName = "";
      state.email = "";
      state.address = [];
      state.userDataStatus = "idle";
      state.userDataError = null;
      state.addAddressStatus = "idle";
      state.addAddressError = null;
    },
  },
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.userDataStatus = "loading";
      state.userDataError = null;
    },
    [getUserData.fulfilled]: (state, action) => {
      const { data } = action.payload;
      state.userId = data._id;
      state.firstName = data.firstName;
      state.lastName = data.lastName;
      state.email = data.email;
      state.userDataStatus = "fulfilled";
      state.userDataError = null;
    },
    [getUserData.pending]: (state) => {
      state.userDataStatus = state.userDataError = "error";
    },
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
