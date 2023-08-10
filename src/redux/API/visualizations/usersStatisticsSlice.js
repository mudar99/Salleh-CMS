import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetUsersNumberAPI, GetUsersRatioAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const GetUsersNumber = createAsyncThunk("admin/statistic/users/number", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetUsersNumberAPI);
    console.log(data)
    return data
});
export const GetUsersRatioNumber = createAsyncThunk("admin/statistic/users/ratio", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetUsersRatioAPI);
    console.log(data)
    return data
});
export const usersStatisticsSlice = createSlice({
    name: "usersStatisticsSlice",
    initialState: {
        loading: null,
        numbers: [],
        ratio: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetUsersNumber.pending, (state) => {
            state.loading = true;
        }).addCase(GetUsersNumber.fulfilled, (state, { payload }) => {
            console.log(payload.data)
            state.numbers = payload.data;
            state.loading = false;
        }).addCase(GetUsersNumber.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(GetUsersRatioNumber.pending, (state) => {
            state.loading = true;
        }).addCase(GetUsersRatioNumber.fulfilled, (state, { payload }) => {
            console.log(payload.data)
            state.ratio = payload.data;
            state.loading = false;
        }).addCase(GetUsersRatioNumber.rejected, (state, { payload }) => {
            state.loading = false;
        })
    }
});
export default usersStatisticsSlice.reducer;