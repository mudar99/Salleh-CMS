import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import New from './pages/new/New';
import Single from './pages/single/Single';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import "./style.scss";
import "./style/dark.scss";
import { useSelector } from "react-redux";
import VerficationList from './pages/verfications/VerficationList';
import Verfication from './pages/verfications/Verfication';
import Customers from './pages/customers/Customers';
import Employees from './pages/employees/Employees';
import Workshops from './pages/workshops/Workshops';
import TowingCars from './pages/towing cars/TowingCars';
import Warehouses from './pages/warehouses/Warehouses';
import Cookies from 'universal-cookie';


function App() {
  const { darkMode } = useSelector((state) => state.DarkMode);
  const cookie = new Cookies();
  // if (cookie.get("jwt_authoriazation") === undefined) {
  //   window.location.href = "/login";
  // }
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
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
              <Route path=':userId' element={<Single />} />
            </Route>

            <Route path='towingcars' >
              <Route index element={<TowingCars />} />
              <Route path=':userId' element={<Single />} />
            </Route>

            <Route path='warehouses' >
              <Route index element={<Warehouses />} />
              <Route path=':userId' element={<Single />} />
            </Route>


            <Route path='employees' >
              <Route index element={<Employees />} />
              <Route path=':userId' element={<Single />} />
              <Route path='new' element={<New />} />
            </Route>

            <Route path='products' >
              <Route index element={<List />} />
              <Route path=':productId' element={<Single />} />
              <Route path='new' element={<New />} />
            </Route>

            <Route path='verifications' >
              <Route index element={<List />} />
              <Route path=':verificationId' element={<Verfication />} />
            </Route>

            <Route />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;