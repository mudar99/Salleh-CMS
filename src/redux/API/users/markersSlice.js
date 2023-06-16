import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetStorehousesAPI, GetTowingsAPI, GetWorkShopsAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const GetWorkShopsMarkers = createAsyncThunk("admin/users/markers/workshops", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetWorkShopsAPI);
    console.log(data)
    return data
});
export const GetTowingsMarkers = createAsyncThunk("admin/users/markers/towings", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetTowingsAPI);
    console.log(data)
    return data
});

export const GetStorehousesMarkers = createAsyncThunk("admin/users/markers/storehouses", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetStorehousesAPI);
    console.log(data)
    return data
});

export const markersSlice = createSlice({
    name: "markersSlice",
    initialState: {
        loading: null,
        data: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetStorehousesMarkers.pending, (state) => {
            state.loading = true;
        }).addCase(GetStorehousesMarkers.fulfilled, (state, { payload }) => {
            state.data = payload.data;
            state.loading = false;
        }).addCase(GetStorehousesMarkers.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(GetTowingsMarkers.pending, (state) => {
            state.loading = true;
        }).addCase(GetTowingsMarkers.fulfilled, (state, { payload }) => {
            state.data = payload.data;
            state.loading = false;
        }).addCase(GetTowingsMarkers.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(GetWorkShopsMarkers.pending, (state) => {
            state.loading = true;
        }).addCase(GetWorkShopsMarkers.fulfilled, (state, { payload }) => {
            state.data = payload.data;
            state.loading = false;
        }).addCase(GetWorkShopsMarkers.rejected, (state, { payload }) => {
            state.loading = false;
        })
    }
});
export default markersSlice.reducer;