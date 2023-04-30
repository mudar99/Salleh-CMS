import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import New from './pages/new/New';
import Single from './pages/single/Single';
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
import Orders from './pages/oreders-management/Orders';
import NotFound from './pages/components/notfound/NotFound';
import Roles from './pages/roles/Roles';


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

            <Route path='customers' >
              <Route index element={<Customers />} />
              <Route path=':userId' element={<Single />} />
              <Route path='new' element={<New />} />
            </Route>

            <Route path='workshops' >
              <Route index element={<Workshops />} />
              <Route path=':workshopId' element={<Single />} />
            </Route>

            <Route path='towingcars' >
              <Route index element={<TowingCars />} />
              <Route path=':userId' element={<Single />} />
            </Route>

            <Route path='warehouses' >
              <Route index element={<Warehouses />} />
              <Route path=':userId' element={<Single />} />
            </Route>


            <Route path='roles' >
              <Route index element={<Roles />} />
            </Route>


            <Route path='employees' >
              <Route index element={<Employees />} />
              <Route path=':userId' element={<Single />} />
              <Route path='new' element={<New />} />
            </Route>

            <Route path='orders' >
              <Route index element={<Orders />} />
            </Route>

            <Route path='categories' >
              <Route index element={<Categories />} />
            </Route>

            <Route path='products' >
              <Route index element={<List />} />
              <Route path=':productId' element={<Single />} />
              <Route path='new' element={<New />} />
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

            <Route />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;