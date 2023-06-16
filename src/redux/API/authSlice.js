import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { loginAPI, logoutAPI } from "../../API";
import Cookies from 'universal-cookie';

const cookie = new Cookies();
export const adminLogin = createAsyncThunk("admin/login", async (user, { rejectWithValue }) => {
  try {
    let { data } = await axios.post(loginAPI, user);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});
export const adminLogout = createAsyncThunk("admin/logout", async (token) => {
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  }
  const res = await axios.post(logoutAPI);
  // console.log(res);
  return res.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: null,
    adminToken: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminLogin.pending, (state) => {
      state.loading = true;
    }).addCase(adminLogin.fulfilled, (state, { payload }) => {
      if (payload.status === true) {
        localStorage.setItem("email", payload.data.user.email);
        state.adminToken = payload.data.accessToken;
        cookie.set('jwt_authorization', payload.data.accessToken,
          { expires: new Date(payload.data.accessToken.exp * 1000) }
        )
        window.location.href = "/";
      }
      state.loading = false;
    }).addCase(adminLogin.rejected, (state, { payload }) => {
      state.loading = false;
    })

    builder.addCase(adminLogout.fulfilled, (state, { payload }) => {
      console.log(payload)
      // cookie.remove('jwt_authorization');
      if (payload.status === true) {
        state.adminToken = null;
        cookie.remove('jwt_authorization');
        window.location.href = "/login";
      }
      state.loading = false;
    }).addCase(adminLogout.rejected, (state) => {
      state.loading = false;
    })
  }

});

export default authSlice.reducer;
