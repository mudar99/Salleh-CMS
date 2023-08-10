import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetTowinOrdersAPI, GetWorkshopOrdersAPI, GetWorkshopPreordersAPI, ShowTowinOrdersAPI, ShowWorkshopOrdersAPI, ShowWorkshopPreordersAPI } from "../../API";

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
export const ShowWorkshopOrders = createAsyncThunk("admin/workshop/show-orders", async (id) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(ShowWorkshopOrdersAPI + id);
    console.log(data)
    return data;
});
export const GetWorkshopPreOrders = createAsyncThunk("admin/workshop/pre-orders", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetWorkshopPreordersAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const ShowWorkshopPreOrders = createAsyncThunk("admin/workshop/show-pre-orders", async (id) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(ShowWorkshopPreordersAPI + id);
    console.log(data)
    return data;
});
export const GetTowingOrders = createAsyncThunk("admin/towing/orders", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetTowinOrdersAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const ShowTowingOrders = createAsyncThunk("admin/towing/show-orders", async (id) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(ShowTowinOrdersAPI + id);
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

        builder.addCase(GetWorkshopPreOrders.pending, (state) => {
            state.loading = true;
        }).addCase(GetWorkshopPreOrders.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetWorkshopPreOrders.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(ShowWorkshopOrders.pending, (state) => {
            state.loading = true;
        }).addCase(ShowWorkshopOrders.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.loading = false;
        }).addCase(ShowWorkshopOrders.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(ShowWorkshopPreOrders.pending, (state) => {
            state.loading = true;
        }).addCase(ShowWorkshopPreOrders.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.loading = false;
        }).addCase(ShowWorkshopPreOrders.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(GetTowingOrders.pending, (state) => {
            state.loading = true;
        }).addCase(GetTowingOrders.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetTowingOrders.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(ShowTowingOrders.pending, (state) => {
            state.loading = true;
        }).addCase(ShowTowingOrders.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.loading = false;
        }).addCase(ShowTowingOrders.rejected, (state, { payload }) => {
            state.loading = false;
        })

    }
});

export default ordersSlice.reducer;