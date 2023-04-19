import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { CreateGategoryAPI, DeleteGategoryAPI, GetGategoriesAPI, UpdateGategoryAPI } from "../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const getCategories = createAsyncThunk("admin/gategories/get", async () => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetGategoriesAPI);
    console.log(data)
    return data;
});
export const CreateCategory = createAsyncThunk("admin/gategories/create", async (obj, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(CreateGategoryAPI, obj);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const UpdateCategory = createAsyncThunk("admin/gategories/update", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(UpdateGategoryAPI + info.id + "/update", info.obj);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const DeleteCategory = createAsyncThunk("admin/gategories/delete", async (id, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.delete(DeleteGategoryAPI + id + "/delete");
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const categorySlice = createSlice({
    name: "categorySlice",
    initialState: {
        loading: null,
        data: [],
        btnLoading: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategories.pending, (state) => {
            state.loading = true;
        }).addCase(getCategories.fulfilled, (state, { payload }) => {
            state.data = payload.data;
            state.loading = false;
        }).addCase(getCategories.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(CreateCategory.pending, (state) => {
            state.btnLoading = true;
        }).addCase(CreateCategory.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.btnLoading = false;
        }).addCase(CreateCategory.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

        builder.addCase(UpdateCategory.pending, (state) => {
            state.btnLoading = true;
        }).addCase(UpdateCategory.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.btnLoading = false;
        }).addCase(UpdateCategory.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })
    }
});

export const { } = categorySlice.actions;

export default categorySlice.reducer;