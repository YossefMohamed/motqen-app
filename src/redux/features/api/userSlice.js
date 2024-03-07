import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BEARER_TOKEN } from "../../../helpers/constants";

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const response = await axios({
      method: "get",
      url: `https://srv475086.hstgr.cloud/api/userinfo/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          localStorage.getItem("token") || BEARER_TOKEN
        }`,
      },
    });
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    profile_picture: "",
    subscription_plan: "Free",
    is_staff: false,
    is_superuser: false,
    username: "",
  },
  reducers: {}, // Remove empty reducers object
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.username = payload.username;
      state.profile_picture = payload.profile_picture;
      state.subscription_plan = payload.subscription_plan;
      state.is_staff = payload.is_staff;
      state.is_superuser = payload.is_superuser;
    });
  },
});

// Remove unnecessary import and incorrect action export
// export const { addTodo } = checkerSlice.actions;
export default userSlice.reducer;
