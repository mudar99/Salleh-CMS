import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { towingAcceptRequest, towingGetFileRequest, towingGetVerifyRequests, towingRejectRequest } from "../../../../API";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const getVerifyRequests = createAsyncThunk("admin/verify/towings", async () => {
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  }
  let { data } = await axios.get(towingGetVerifyRequests);
  console.log(data)
  return data;
});
export const getFileRequest = createAsyncThunk("admin/verify/towing", async (id) => {
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  }
  const res = await axios.get(towingGetFileRequest + id + "/files");
  // console.log(res);
  return res.data;
});
export const acceptRequest = createAsyncThunk("admin/verify/accept-towing", async (id) => {
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  }
  const res = await axios.delete(towingAcceptRequest + id + "/accept");
  console.log(res);
  return res.data;
});

export const rejectRequest = createAsyncThunk("admin/verify/reject-towing", async (id) => {
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  }
  const res = await axios.delete(towingRejectRequest + id + "/reject");
  console.log(res);
  return res.data;
});

export const towingVerifications = createSlice({
  name: "towingVerifications",
  initialState: {
    galliriaLoading: null,
    loading: null,
    data: [],
    images: [],
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVerifyRequests.pending, (state) => {
      state.loading = true;
    }).addCase(getVerifyRequests.fulfilled, (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
    }).addCase(getVerifyRequests.rejected, (state, { payload }) => {
      state.loading = false;
    })

    builder.addCase(getFileRequest.pending, (state) => {
      state.galliriaLoading = true;
    }).addCase(getFileRequest.fulfilled, (state, { payload }) => {
      state.images = payload.data.requestFiles;
      state.galliriaLoading = false;
    }).addCase(getFileRequest.rejected, (state, { payload }) => {
      state.galliriaLoading = false;
    })

    builder.addCase(acceptRequest.pending, (state) => {
      state.loading = true;
    }).addCase(acceptRequest.fulfilled, (state, { payload }) => {
      state.message = payload.message
      state.loading = false;
    }).addCase(acceptRequest.rejected, (state, { payload }) => {
      state.loading = false;
    })


    builder.addCase(rejectRequest.pending, (state) => {
      state.loading = true;
    }).addCase(rejectRequest.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.message = payload.message
    }).addCase(rejectRequest.rejected, (state, { payload }) => {
      state.loading = false;
    })
  }
});

export const { } = towingVerifications.actions;

export default towingVerifications.reducer;