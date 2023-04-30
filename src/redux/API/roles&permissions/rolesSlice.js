import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { AddRoleAPI, DeleteRoleAPI, GetRolesAPI, ShowRoleAPI, UpdateRoleAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const GetRoles = createAsyncThunk("admin/roles", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetRolesAPI + info.size + "&page=" + info.page);
    console.log(data)
    return data;
});
export const CreateRole = createAsyncThunk("admin/roles/create", async (obj, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(AddRoleAPI, obj);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const UpdateRole = createAsyncThunk("admin/roles/update", async (info, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.post(UpdateRoleAPI + info.id, info.obj);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const ShowRole = createAsyncThunk("admin/roles/show", async (id) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(ShowRoleAPI + id);
    console.log(data)
    return data;
});
export const DeleteRole = createAsyncThunk("admin/roles/delete", async (id, { rejectWithValue }) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    try {
        let { data } = await axios.delete(DeleteRoleAPI + id);
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
export const rolesSlice = createSlice({
    name: "rolesSlice",
    initialState: {
        loading: null,
        data: [],
        show: [],
        message: "",
        totalItems: "",
        btnLoading: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetRoles.pending, (state) => {
            state.loading = true;
        }).addCase(GetRoles.fulfilled, (state, { payload }) => {
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetRoles.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(CreateRole.pending, (state) => {
            state.btnLoading = true;
        }).addCase(CreateRole.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.btnLoading = false;
        }).addCase(CreateRole.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

        builder.addCase(UpdateRole.pending, (state) => {
            state.btnLoading = true;
        }).addCase(UpdateRole.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.btnLoading = false;
        }).addCase(UpdateRole.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

        builder.addCase(ShowRole.pending, (state) => {
            state.btnLoading = true;
        }).addCase(ShowRole.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.show = payload.data;
            state.btnLoading = false;
        }).addCase(ShowRole.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })
    }
});

export const { } = rolesSlice.actions;

export default rolesSlice.reducer;