import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice';
const store = configureStore({
    reducer: {
        DarkMode: themeSlice,
    }
});
export default store