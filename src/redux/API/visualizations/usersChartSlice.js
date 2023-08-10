import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetUsersNumberAPI, GetUsersNumberChartAPI, GetUsersRatioAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const GetUsersNumberChart = createAsyncThunk("admin/chart/users/number", async (obj, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(GetUsersNumberChartAPI, obj);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const usersChartSlice = createSlice({
    name: "usersChartSlice",
    initialState: {
        chartLoading: null,
        data: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetUsersNumberChart.pending, (state) => {
            state.chartLoading = true;
        }).addCase(GetUsersNumberChart.fulfilled, (state, { payload }) => {
            console.log(payload.data)
            state.data = payload.data;
            state.chartLoading = false;
        }).addCase(GetUsersNumberChart.rejected, (state, { payload }) => {
            state.chartLoading = false;
        })

    }
});
export default usersChartSlice.reducer;