import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetCustomersAPI, GetStorehousesAPI, GetTowingsAPI, GetWorkShopsAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const GetCustomers = createAsyncThunk("admin/users/customers", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetCustomersAPI);
    console.log(data)
    return data;
});
export const GetWorkShops = createAsyncThunk("admin/users/workshops", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetWorkShopsAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const GetTowings = createAsyncThunk("admin/users/towings", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetTowingsAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const GetStorehouses = createAsyncThunk("admin/users/storehouses", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetStorehousesAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});

export const usersSlice = createSlice({
    name: "usersSlice",
    initialState: {
        loading: null,
        data: [],
        message: "",
        totalItems: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetStorehouses.pending, (state) => {
            state.loading = true;
        }).addCase(GetStorehouses.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetStorehouses.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(GetTowings.pending, (state) => {
            state.loading = true;
        }).addCase(GetTowings.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetTowings.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(GetWorkShops.pending, (state) => {
            state.loading = true;
        }).addCase(GetWorkShops.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetWorkShops.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(GetCustomers.pending, (state) => {
            state.loading = true;
        }).addCase(GetCustomers.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetCustomers.rejected, (state, { payload }) => {
            state.loading = false;
        })
    }
});

export const { } = usersSlice.actions;

export default usersSlice.reducer;