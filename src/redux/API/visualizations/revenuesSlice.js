import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetRevenuesAPI, GetRevenuesByUserAPI, GetUsersNumberAPI, GetUsersNumberChartAPI, GetUsersRatioAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const GetRevenues = createAsyncThunk("admin/revenue", async (obj, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(GetRevenuesAPI, obj);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const GetRevenueByUser = createAsyncThunk("admin/user/revenue", async (id) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetRevenuesByUserAPI + id);
    console.log(data)
    return data;
});
export const revenuesSlice = createSlice({
    name: "revenuesSlice",
    initialState: {
        revenueLoading: null,
        amount: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetRevenues.pending, (state) => {
            state.revenueLoading = true;
        }).addCase(GetRevenues.fulfilled, (state, { payload }) => {
            state.amount = payload.data;
            state.revenueLoading = false;
        }).addCase(GetRevenues.rejected, (state, { payload }) => {
            state.revenueLoading = false;
        })

        builder.addCase(GetRevenueByUser.pending, (state) => {
            state.revenueLoading = true;
        }).addCase(GetRevenueByUser.fulfilled, (state, { payload }) => {
            state.amount = payload.data;
            state.revenueLoading = false;
        }).addCase(GetRevenueByUser.rejected, (state, { payload }) => {
            state.revenueLoading = false;
        })
        
    }
});
export default revenuesSlice.reducer;