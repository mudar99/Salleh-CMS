import { createAsyncThunk, createSlice, } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { GetSuggestionsAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");
export const GetSuggestions = createAsyncThunk("storehouse/suggestions/get", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetSuggestionsAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const suggestionsSlice = createSlice({
    name: "suggestionsSlice",
    initialState: {
        data: [],
        loading: null,
        totalItems: "",
        currentPage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetSuggestions.pending, (state) => {
            state.loading = true;
        }).addCase(GetSuggestions.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.currentPage = payload.data.current_page
            state.loading = false;
        }).addCase(GetSuggestions.rejected, (state, { payload }) => {
            state.loading = false;
        })


    }
});

export default suggestionsSlice.reducer;