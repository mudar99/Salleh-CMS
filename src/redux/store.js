import { configureStore } from '@reduxjs/toolkit';
import authSlice from './API/authSlice';
import themeSlice from './themeSlice';
import visitSlice from './visitSlice';
import visibleExplore from './visibleExplore';
import workshopVerifications from './API/verify/workshop/workshopVerifications';
import towingVerifications from './API/verify/towing/towingVerifications';
import storehouseVerifications from './API/verify/storehouse/storehouseVerifications';
import usersSlice from './API/users/usersSlice';
import categorySlice from './API/categorySlice';
const store = configureStore({
    reducer: {
        DarkMode: themeSlice,
        VisitStatus: visitSlice,
        admin: authSlice,
        VisibleExplore: visibleExplore,
        WorkshopVerifications: workshopVerifications,
        TowingVerifications: towingVerifications,
        StorehouseVerifications: storehouseVerifications,
        users: usersSlice,
        category: categorySlice,
    }
});
export default store