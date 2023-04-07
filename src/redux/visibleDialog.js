import { createSlice } from '@reduxjs/toolkit'


export const visibleDialog = createSlice({
    name: 'VisibleDialog',
    initialState: {
        visible: false,
    },
    reducers: {
        opened: (state) => {
            state.visible = true
        }, closed: (state) => {
            state.visible = false
        }
    },
})

export const { openedDialog, closedDialog, } = visibleDialog.actions

export default visibleDialog.reducer
