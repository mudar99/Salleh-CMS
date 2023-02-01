import { Component } from 'react';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import New from './pages/new/New';
import Single from './pages/single/Single';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import "./style.scss";
import "./style/dark.scss";
import { useSelector } from "react-redux";


function App() {
  const darkMode = useSelector((state) => state.darkMode);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='users' >
              <Route index element={<List />} />
              <Route path=':userId' element={<Single />} />
              <Route path='new' element={<New />} />
            </Route>

            <Route path='products' >
              <Route index element={<List />} />
              <Route path=':productId' element={<Single />} />
              <Route path='new' element={<New />} />
            </Route>

            <Route />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;