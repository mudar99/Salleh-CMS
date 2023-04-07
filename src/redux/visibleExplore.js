import { createSlice } from '@reduxjs/toolkit'


export const visibleExplore = createSlice({
    name: 'visibleExplore',
    initialState: {
        visible: undefined,
    },
    reducers: {
        Workshops: (state) => {
            state.visible = 'workshopVer'
        }, Towing: (state) => {
            state.visible = 'towingVer'
        }, Warehose: (state) => {
            state.visible = 'warehouseVer'
        }
    },
})

export const { WorkshopsExp, TowingExp, WarehoseExp } = visibleExplore.actions

export default visibleExplore.reducer
