import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Main_Layout from "./Layouts/Main_Layout.jsx";
import Admin_Layout from "./Layouts/Admin_Layout.jsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartProvider from "./context/CartProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";

const isAdmin = window.location.pathname.startsWith("/admin");

const Layout = isAdmin ? Admin_Layout : Main_Layout;

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ScrollToTop />
        <CartProvider>
            <Layout>
                <App />
            </Layout>
        </CartProvider>
    </BrowserRouter>
);
