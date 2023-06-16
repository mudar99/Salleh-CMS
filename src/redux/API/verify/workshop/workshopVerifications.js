import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { workshopAcceptRequest, workshopGetFileRequest, workshopGetVerifyRequests, workshopRejectRequest } from "../../../../API";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const getVerifyRequests = createAsyncThunk("admin/verify/workshops", async () => {
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  }
  let { data } = await axios.get(workshopGetVerifyRequests);
  console.log(data)
  return data;
});
export const getFileRequest = createAsyncThunk("admin/verify/workshop", async (id) => {
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  }
  const res = await axios.get(workshopGetFileRequest + id + "/files");
  // console.log(res);
  return res.data;
});
export const acceptRequest = createAsyncThunk("admin/verify/accept-workshop", async (id) => {
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  }
  const res = await axios.delete(workshopAcceptRequest + id + "/accept");
  console.log(res);
  return res.data;
});

export const rejectRequest = createAsyncThunk("admin/verify/reject-workshop", async (id) => {
  axios.defaults.headers = {
    Authorization: `Bearer ${token}`,
  }
  const res = await axios.delete(workshopRejectRequest + id + "/reject");
  console.log(res);
  return res.data;
});

export const workshopVerifications = createSlice({
  name: "workshopVerifications",
  initialState: {
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
      state.loading = true;
    }).addCase(getFileRequest.fulfilled, (state, { payload }) => {
      state.images = payload.data.requestFiles;
      state.loading = false;
    }).addCase(getFileRequest.rejected, (state, { payload }) => {
      state.loading = false;
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

export default workshopVerifications.reducer;