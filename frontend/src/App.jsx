import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home_Page from "./Pages/Home_Page";
import Shop_Page from "./Pages/Shop_Page";
import Blog_Page from "./Pages/Blog_Page";
import Contact_Page from "./Pages/Contact_Page";
import Auth_Page from "./Pages/Auth_Page";
import Cart_Page from "./Pages/Cart_Page";
import Single_Blog_Page from "./Pages/Single_Blog_Page";
import Single_Product_Page from "./Pages/Single_Product_Page";
import UserPage from "./Pages/Admin/UserPage";
import CategoryPage from "./Pages/Admin/Category/CategoryPage";
import UpdateCategoryPage from "./Pages/Admin/Category/UpdateCategoryPage";
import CreateCategoryPage from "./Pages/Admin/Category/CreateCategoryPage";
import CreateProductPage from "./Pages/Admin/Products/CreateProductPage";
import ProductPage from "./Pages/Admin/Products/ProductPage";
import UpdateProductPage from "./Pages/Admin/Products/UpdateProductPage";
import CouponPage from "./Pages/Admin/Coupons/CouponPage";
import CreateCouponPage from "./Pages/Admin/Coupons/CreateCouponPage";
import UpdateCouponPage from "./Pages/Admin/Coupons/UpdateCouponPage";
import Payment_Success_Page from "./Pages/Payment_Success_Page";
import OrderPage from "./Pages/Admin/OrderPage";
import DashboardPage from "./Pages/Admin/DashboardPage";
import NotFoundErrorPage from "./Pages/NotFoundErrorPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home_Page />} />
            <Route path="/home" element={<Home_Page />} />
            <Route path="/shop" element={<Shop_Page />} />
            <Route path="/blog" element={<Blog_Page />} />
            <Route path="/contact" element={<Contact_Page />} />
            <Route path="/auth" element={<Auth_Page />} />
            <Route path="/cart" element={<Cart_Page />} />
            <Route path="/success" element={<Payment_Success_Page />} />
            <Route path="/product/:id" element={<Single_Product_Page />} />
            <Route path="/blog/:id" element={<Single_Blog_Page />} />
            <Route path="/admin/*">
                <Route index element={<DashboardPage />} />
                <Route path="users" element={<UserPage />} />
                <Route path="categories" element={<CategoryPage />} />
                <Route path="categories/update/:id" element={<UpdateCategoryPage />} />
                <Route path="categories/create" element={<CreateCategoryPage />} />
                <Route path="products/create" element={<CreateProductPage />} />
                <Route path="products" element={<ProductPage />} />
                <Route path="products/update/:id" element={<UpdateProductPage />} />
                <Route path="coupons" element={<CouponPage />} />
                <Route path="coupons/create" element={<CreateCouponPage />} />
                <Route path="coupons/update/:id" element={<UpdateCouponPage />} />
                <Route path="orders" element={<OrderPage />} />
            </Route>
            <Route path="*" element={<NotFoundErrorPage />} />
        </Routes>
    );
}

export default App;
