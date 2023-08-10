import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import "./style.scss";
import "./style/dark.scss";
import { useSelector } from "react-redux";
import WorkshopVer from './pages/verfications/Workshop/WorkshopVer';
import Customers from './pages/customers/Customers';
import Employees from './pages/employees/Employees';
import Workshops from './pages/workshops/Workshops';
import TowingCars from './pages/towing cars/TowingCars';
import Warehouses from './pages/warehouses/Warehouses';
import WarehouseVer from './pages/verfications/Warehouse/WarehouseVer';
import TowingVer from './pages/verfications/Towing/TowingVer';
import Categories from './pages/categories/Categories';
import Orders from './pages/orders-management/Orders';
import NotFound from './pages/components/notfound/NotFound';
import Roles from './pages/roles/Roles';
import Maps from './pages/maps/Maps';
import Complaints from './pages/complaints/Complaints';
import Suggestions from './pages/suggestions/Suggestions';
import Notification from './pages/notifications/Notification';
import UserProfile from './pages/user-profile/UserProfile';
import BlackList from './pages/black-list/BlackList';
import PreOrders from './pages/preorders-management/PreOrders';
import TowingOrders from './pages/towing-orders/TowingOrders';


function App() {
  const { darkMode } = useSelector((state) => state.DarkMode);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />

          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />


            <Route path='clientsmap' >
              <Route index element={<Maps />} />
            </Route>

            <Route path='customers' >
              <Route index element={<Customers />} />
              <Route path=':userId' element={<UserProfile />} />
            </Route>

            <Route path='workshops' >
              <Route index element={<Workshops />} />
              <Route path=':workshopId' element={<UserProfile />} />
            </Route>

            <Route path='towingcars' >
              <Route index element={<TowingCars />} />
              <Route path=':userId' element={<UserProfile />} />
            </Route>

            <Route path='warehouses' >
              <Route index element={<Warehouses />} />
              <Route path=':userId' element={<UserProfile />} />
            </Route>


            <Route path='roles' >
              <Route index element={<Roles />} />
            </Route>


            <Route path='employees' >
              <Route index element={<Employees />} />
              <Route path=':userId' element={<UserProfile />} />
            </Route>

            <Route path='orders' >
              <Route index element={<Orders />} />
            </Route>

            <Route path='pre-orders' >
              <Route index element={<PreOrders />} />
            </Route>

            <Route path='towing-orders' >
              <Route index element={<TowingOrders />} />
            </Route>

            <Route path='categories' >
              <Route index element={<Categories />} />
            </Route>

            <Route path='products' >
              <Route index element={<List />} />
              <Route path=':productId' element={<UserProfile />} />
            </Route>

            <Route path='workshops-verification' >
              <Route index element={<WorkshopVer />} />
            </Route>

            <Route path='warehouses-verification' >
              <Route index element={<WarehouseVer />} />
            </Route>

            <Route path='towings-verification' >
              <Route index element={<TowingVer />} />
            </Route>

            <Route path='complaints' >
              <Route index element={<Complaints />} />
            </Route>

            <Route path='suggestions' >
              <Route index element={<Suggestions />} />
            </Route>

            <Route path='notifications' >
              <Route index element={<Notification />} />
            </Route>

            <Route path='black-list' >
              <Route index element={<BlackList />} />
            </Route>

            <Route />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;