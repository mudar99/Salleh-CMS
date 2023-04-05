import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './API/authSlice';
import themeSlice from './themeSlice';
import visibleDialog from './visibleDialog';
import visitSlice from './visitSlice';
const store = configureStore({
    reducer: {
        DarkMode: themeSlice,
        VisitStatus: visitSlice,
        VisibleDialog: visibleDialog,
        admin: loginSlice
    }
});
export default store