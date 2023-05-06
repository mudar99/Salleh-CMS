import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "universal-cookie";
import { AddRoleAPI, AssignToRoleAPI, DeleteRoleAPI, GetPermissionsAPI, GetRolesAPI, ShowRoleAPI, UpdateRoleAPI } from "../../../API";

const cookie = new Cookies();
const token = cookie.get("jwt_authorization");

export const GetPaginateRoles = createAsyncThunk("admin/roles/paginate", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetRolesAPI + info.size + "&page=" + info.page + "&isPaginate=" + info.isPaginate);
    console.log(data)
    return data;
});
export const GetRoles = createAsyncThunk("admin/roles", async (info) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.get(GetRolesAPI + info.size + "&page=" + info.page + "&isPaginate=" + info.isPaginate);
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
export const GetPermissions = createAsyncThunk("admin/permissions/get", async (id) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    let { data } = await axios.post(GetPermissionsAPI);
    console.log(data)
    return data;
});
export const AssignPermissionsToRole = createAsyncThunk("admin/permissions/assign", async (obj) => {
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    }
    console.log(obj)
    // for (const pair of info.entries()) {
    //     console.log(`${pair[0]}, ${pair[1]}`);
    // }
    let { data } = await axios.post(AssignToRoleAPI + obj.id, obj.info);
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
        showLoading: null,
        permissions: [],
        totalItems: "",
        btnLoading: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(GetRoles.pending, (state) => {
            state.loading = true;
        }).addCase(GetRoles.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.data = payload.data;
            state.loading = false;
        }).addCase(GetRoles.rejected, (state, { payload }) => {
            state.loading = false;
        })

        builder.addCase(GetPaginateRoles.pending, (state) => {
            state.loading = true;
        }).addCase(GetPaginateRoles.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.data = payload.data.data;
            state.totalItems = payload.data.total
            state.loading = false;
        }).addCase(GetPaginateRoles.rejected, (state, { payload }) => {
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
            state.showLoading = true;
        }).addCase(ShowRole.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.show = payload.data;
            state.showLoading = false;
        }).addCase(ShowRole.rejected, (state, { payload }) => {
            state.showLoading = false;
        })

        builder.addCase(GetPermissions.pending, (state) => {
            state.btnLoading = true;
        }).addCase(GetPermissions.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.permissions = payload.data;
            state.btnLoading = false;
        }).addCase(GetPermissions.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })

        builder.addCase(AssignPermissionsToRole.pending, (state) => {
            state.btnLoading = true;
        }).addCase(AssignPermissionsToRole.fulfilled, (state, { payload }) => {
            console.log(payload)
            state.btnLoading = false;
        }).addCase(AssignPermissionsToRole.rejected, (state, { payload }) => {
            state.btnLoading = false;
        })
    }
});

export const { } = rolesSlice.actions;

export default rolesSlice.reducer;