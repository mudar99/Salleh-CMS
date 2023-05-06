
export const local = 'http://127.0.0.1:8060/api/cms';
export const loginAPI = `${local}/login`;
export const logoutAPI = `${local}/logout`;

export const GetRolesAPI = `${local}/roles?size=`;
export const AddRoleAPI = `${local}/roles`;
export const UpdateRoleAPI = `${local}/roles/`;
export const ShowRoleAPI = `${local}/roles/`;
export const DeleteRoleAPI = `${local}/roles/`;
export const AssignToRoleAPI = `${local}/roles/permissions/assignment/`;
export const GetPermissionsAPI = `${local}/permissions/except`

export const GetAdminsAPI = `${local}/admins?size=`;
export const AddAdminAPI = `${local}/admins`;
export const UpdateAdminAPI = `${local}/admins/`;
export const ShowAdminAPI = `${local}/admins/`;
export const DeleteAdminAPI = `${local}/admins/`;

export const GetCustomersAPI = `${local}/users?type=0&size=`;
export const GetWorkShopsAPI = `${local}/users?type=1&size=`;
export const GetTowingsAPI = `${local}/users?type=2&size=`;
export const GetStorehousesAPI = `${local}/users?type=3&size=`;

export const GetCategoriesAPI = `${local}/category/get/`;
export const CreateGategoryAPI = `${local}/category/create`;
export const UpdateGategoryAPI = `${local}/category/`;
export const DeleteGategoryAPI = `${local}/category/`;

export const workshopGetVerifyRequests = `${local}/workshop/request/get`;
export const workshopGetFileRequest = `${local}/workshop/request/`;
export const workshopRejectRequest = `${local}/workshop/request/`;
export const workshopAcceptRequest = `${local}/workshop/request/`;

export const storehouseGetVerifyRequests = `${local}/storehouse/request/get`;
export const storehouseGetFileRequest = `${local}/storehouse/request/`;
export const storehouseRejectRequest = `${local}/storehouse/request/`;
export const storehouseAcceptRequest = `${local}/storehouse/request/`;

export const towingGetVerifyRequests = `${local}/towing/request/get`;
export const towingGetFileRequest = `${local}/towing/request/`;
export const towingRejectRequest = `${local}/towing/request/`;
export const towingAcceptRequest = `${local}/towing/request/`;

export const GetWorkshopOrdersAPI = `${local}/workshop/orders?size=`;
export const GetSingleWorkshopOrdersAPI = `${local}/workshop/orders/`;
