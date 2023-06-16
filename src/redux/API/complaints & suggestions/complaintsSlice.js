import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetComplaintsAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");
export const GetComplaints = createAsyncThunk("admin/complaints/get", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetComplaintsAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const complaintsSlice = createSlice({
    name: "complaintsSlice",
    initialState: {
        data: [],
        loading: null,
        totalItems: "",
        currentPage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetComplaints.pending, (state) => {
            state.loading = true;
        }).addCase(GetComplaints.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.currentPage = payload.data.current_page
            state.loading = false;
        }).addCase(GetComplaints.rejected, (state, { payload }) => {
            state.loading = false;
        })

    }
});

export default complaintsSlice.reducer;