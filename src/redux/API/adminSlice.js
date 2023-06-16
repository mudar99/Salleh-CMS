import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { AddAdminAPI, DeleteAdminAPI, GetAdminsAPI, ShowAdminAPI, UpdateAdminAPI } from "../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const GetAdmins = createAsyncThunk("admin/admins/get", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetAdminsAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const CreateAdmin = createAsyncThunk("admin/admins/create", async (obj, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(AddAdminAPI, obj);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const UpdateAdmin = createAsyncThunk("admin/admins/update", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(UpdateAdminAPI + info.id, info.obj);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const ShowAdmin = createAsyncThunk("admin/admins/show", async (id) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(ShowAdminAPI + id);
    console.log(data)
    return data;
});
export const DeleteAdmin = createAsyncThunk("admin/admins/delete", async (id, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.delete(DeleteAdminAPI + id);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const adminSlice = createSlice({
    name: "adminSlice",
    initialState: {
        loading: null,
        data: [],
        message: "",
        totalItems: "",
        btnLoading: null,
        show: [],
        currentPage: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetAdmins.pending, (state) => {
            state.loading = true;
        }).addCase(GetAdmins.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.currentPage = payload.data.current_page
            state.loading = false;
        }).addCase(GetAdmins.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(CreateAdmin.pending, (state) => {
            state.btnLoading = true;
        }).addCase(CreateAdmin.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.btnLoading = false;
        }).addCase(CreateAdmin.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

        builder.addCase(UpdateAdmin.pending, (state) => {
            state.btnLoading = true;
        }).addCase(UpdateAdmin.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.btnLoading = false;
        }).addCase(UpdateAdmin.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

        builder.addCase(ShowAdmin.pending, (state) => {
            state.btnLoading = true;
        }).addCase(ShowAdmin.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.show = payload.data;
            state.btnLoading = false;
        }).addCase(ShowAdmin.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

    }
});

export default adminSlice.reducer;