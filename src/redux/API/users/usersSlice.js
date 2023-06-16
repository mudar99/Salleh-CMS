import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { ChargeWalletAPI, GetCustomersAPI, GetStorehousesAPI, GetTowingsAPI, GetUserChargesAPI, GetWorkShopsAPI, ShowUserAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const GetCustomers = createAsyncThunk("admin/users/customers", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetCustomersAPI + info.size + "&page=" + info.page + "&isPaginate=" + info.isPaginate);
    console.log(data)
    return data;
});
export const GetWorkShops = createAsyncThunk("admin/users/workshops", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetWorkShopsAPI + info.size + "&page=" + info.page + "&isPaginate=" + info.isPaginate);
    console.log(data)
    return data
});
export const GetTowings = createAsyncThunk("admin/users/towings", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetTowingsAPI + info.size + "&page=" + info.page + "&isPaginate=" + info.isPaginate);
    console.log(data)
    return data
});
export const GetStorehouses = createAsyncThunk("admin/users/storehouses", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }

    let { data } = await axios.get(GetStorehousesAPI + info.size + "&page=" + info.page + "&isPaginate=" + info.isPaginate);
    console.log(data)
    return data
});
export const ShowUser = createAsyncThunk("admin/user/show", async (id) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(ShowUserAPI + id);
    console.log(data)
    return data;
});
export const GetUserCharges = createAsyncThunk("admin/user/charges", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetUserChargesAPI + info.id + "?size=" + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const WalletChargeService = createAsyncThunk("admin/user/wallet/charge", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(ChargeWalletAPI + info.id, info.obj);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const usersSlice = createSlice({
    name: "usersSlice",
    initialState: {
        loading: null,
        btnLoading: null,
        data: [],
        message: "",
        totalItems: "",
        userData: { information: {}, charges: {}, chart: {} }
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

        builder.addCase(ShowUser.pending, (state) => {
            state.loading = true;
        }).addCase(ShowUser.fulfilled, (state, { payload }) => {
            state.userData.information = payload.data;
            state.loading = false;
        }).addCase(ShowUser.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(GetUserCharges.pending, (state) => {
            state.loading = true;
        }).addCase(GetUserCharges.fulfilled, (state, { payload }) => {
            state.userData.charges = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetUserCharges.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(WalletChargeService.pending, (state) => {
            state.btnLoading = true;
        }).addCase(WalletChargeService.fulfilled, (state, { payload }) => {
            state.btnLoading = false;
        }).addCase(WalletChargeService.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

    }
});

export default usersSlice.reducer;