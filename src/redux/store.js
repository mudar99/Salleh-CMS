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
import ordersSlice from './API/ordersSlice';
import rolesSlice from './API/roles&permissions/rolesSlice';
import adminSlice from './API/adminSlice';
import suggestionsSlice from './API/complaints & suggestions/suggestionsSlice';
import complaintsSlice from './API/complaints & suggestions/complaintsSlice';
import markersSlice from './API/users/markersSlice';
const store = configureStore({
    reducer: {
        DarkMode: themeSlice,
        VisitStatus: visitSlice,
        auth: authSlice,
        VisibleExplore: visibleExplore,
        WorkshopVerifications: workshopVerifications,
        TowingVerifications: towingVerifications,
        StorehouseVerifications: storehouseVerifications,
        users: usersSlice,
        markers: markersSlice,
        category: categorySlice,
        orders: ordersSlice,
        roles: rolesSlice,
        admins: adminSlice,
        suggestions: suggestionsSlice,
        complaints: complaintsSlice
    }
});
export default store