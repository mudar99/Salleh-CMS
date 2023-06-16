import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetSingleWorkshopOrdersAPI, GetWorkshopOrdersAPI } from "../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const GetWorkshopOrders = createAsyncThunk("admin/workshop/orders", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetWorkshopOrdersAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const GetSingleWorkshopOrders = createAsyncThunk("admin/workshop/its-orders", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetSingleWorkshopOrdersAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const ordersSlice = createSlice({
    name: "ordersSlice",
    initialState: {
        loading: null,
        data: [],
        message: "",
        totalItems: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetWorkshopOrders.pending, (state) => {
            state.loading = true;
        }).addCase(GetWorkshopOrders.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetWorkshopOrders.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(GetSingleWorkshopOrders.pending, (state) => {
            state.loading = true;
        }).addCase(GetSingleWorkshopOrders.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetSingleWorkshopOrders.rejected, (state, { payload }) => {
            state.loading = false;
        })
    }
});

export default ordersSlice.reducer;