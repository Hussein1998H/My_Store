import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./components/pages/home/Home";
import RegisterPage from "./components/pages/Auth/Rigister";
import LoginPage from "./components/pages/Auth/Login";
import ProductDetails from "./components/pages/ProductDetails";

import AdminDashboard from './adminDashboard/AdminDashboard.jsx';
import AdminLogin from './adminDashboard/Login.jsx'
import RequierAdminAuth from './components/pages/Auth/RequierAdminAuth.js';
import Home from './adminDashboard/pages/Home.jsx';
import AddUser from './adminDashboard/pages/AddUser.jsx';
import AllUsers from './adminDashboard/pages/AllUsers.jsx';
import AllProducts from './adminDashboard/pages/AllProducts.jsx';
import AddProduct from './adminDashboard/pages/AddProduct.jsx';
import UpdateProduct from './adminDashboard/pages/UpdateProduct.jsx';
import UpdateUser from './adminDashboard/pages/UpdateUser.jsx';
import AllCategories from './adminDashboard/pages/AllCategories.jsx';
import UpdateCategory from './adminDashboard/pages/UpdateCategory.jsx';
import AddCategory from './adminDashboard/pages/AddCategory.jsx';
import AllOrder from './adminDashboard/pages/AllOrder.jsx';
import UpdateOrder from './adminDashboard/pages/UpdateOrder.jsx';
import RequierAuth from "./components/pages/Auth/RequierAuth.js";
import UserOrders from "./components/pages/UserOrders.jsx";
import OrderDeatails from "./components/pages/OrderDeatails.jsx";
import UserCart from "./components/pages/UserCart.jsx";

export default function MyApp() {
    return <BrowserRouter>
        <Routes>
        <Route path="register" element={<RegisterPage />} />
                <Route path="login" element={<LoginPage />} />
                   {/* For Users */}
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='product/:id' element={<ProductDetails/>}/>
                <Route element={<RequierAuth/>}>
                  <Route path='my-order' element={<UserOrders/>}/>
                  <Route path='my-order/:id' element={<OrderDeatails/>}></Route>
                  <Route path='my-cart' element={<UserCart/>}></Route>
                </Route>

            </Route>

                    {/* for Admin */}
                    <Route path='/admin' >
        <Route path='login' element={<AdminLogin/>}></Route>
        <Route element={<RequierAdminAuth/>}>
       
        <Route path='dashboard' element={<AdminDashboard/>}>
          <Route index path='home' element={<Home/>}></Route>
          {/* User */}
          <Route index path='add-user' element={<AddUser/>}></Route>
          <Route index path='all-user' element={<AllUsers/>}></Route>
          <Route index path='all-user/:id' element={<UpdateUser/>}></Route>
          {/* Product */}
          <Route index path='all-products' element={<AllProducts/>}></Route>
          <Route index path='all-products/:id' element={<UpdateProduct/>}></Route>
          <Route index path='add-product' element={<AddProduct/>}></Route>
          {/* Category */}
          <Route index path='all-categories' element={<AllCategories/>}></Route>
          <Route index path='all-categories/:id' element={<UpdateCategory/>}></Route>
          <Route index path='add-category' element={<AddCategory/>}></Route>
          {/* Order */}
          <Route index path='all-order' element={<AllOrder/>}></Route>
          <Route index path='all-order/:id' element={<UpdateOrder/>}></Route>

        </Route>

        </Route>
      </Route>
        </Routes>
    </BrowserRouter>
}