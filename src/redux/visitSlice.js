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
        }, categoriesManage: (state) => {
            state.place = 'categoriesManage'
        },
    },
})

export const { dashboard, customers, employees, towing, warehouses, workshops, requestsManage, categoriesManage, towingV, warehouseV, workshopV } = visitSlice.actions

export default visitSlice.reducer
