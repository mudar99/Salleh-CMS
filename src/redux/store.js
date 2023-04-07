import { configureStore } from '@reduxjs/toolkit';
import authSlice from './API/authSlice';
import themeSlice from './themeSlice';
import visibleDialog from './visibleDialog';
import visitSlice from './visitSlice';
import visibleExplore from './visibleExplore';
const store = configureStore({
    reducer: {
        DarkMode: themeSlice,
        VisitStatus: visitSlice,
        VisibleDialog: visibleDialog,
        admin: authSlice,
        VisibleExplore: visibleExplore,
    }
});
export default store