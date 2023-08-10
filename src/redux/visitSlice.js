import { createSlice } from '@reduxjs/toolkit'


export const visitSlice = createSlice({
    name: 'VisitStatus',
    initialState: {
        place: undefined,
    },
    reducers: {
        dashboard: (state) => {
            state.place = 'dashboard'
        }, customers: (state) => {
            state.place = 'customers'
        }, workshops: (state) => {
            state.place = 'workshops'
        }, towing: (state) => {
            state.place = 'towing'
        }, warehouses: (state) => {
            state.place = 'warehouses'
        }, towingV: (state) => {
            state.place = 'towingV'
        }, warehouseV: (state) => {
            state.place = 'warehouseV'
        }, workshopV: (state) => {
            state.place = 'workshopV'
        }, employees: (state) => {
            state.place = 'employees'
        }, requestsManage: (state) => {
            state.place = 'requestsManage'
        }, preRequestsManage: (state) => {
            state.place = 'preRequestsManage'
        }, towingRequests: (state) => {
            state.place = 'towingRequests'
        },
        categoriesManage: (state) => {
            state.place = 'categoriesManage'
        }, roles: (state) => {
            state.place = 'roles'
        }, maps: (state) => {
            state.place = 'maps'
        }, suggestions: (state) => {
            state.place = 'suggestions'
        }, complaints: (state) => {
            state.place = 'complaints'
        }, block: (state) => {
            state.place = 'block'
        },
    },
})

export const { block, complaints, suggestions, maps,
    dashboard, customers, roles, employees, towing,
    warehouses, workshops, requestsManage,
    categoriesManage, towingV, warehouseV,
    workshopV, preRequestsManage, towingRequests } = visitSlice.actions

export default visitSlice.reducer
