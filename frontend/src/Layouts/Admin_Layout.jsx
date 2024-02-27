/* eslint-disable react/prop-types */
import { Layout, Menu } from "antd";
import {
    AppstoreOutlined,
    BarcodeOutlined,
    DashboardOutlined,
    LaptopOutlined,
    RollbackOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Content, Header, Sider } = Layout;

function getUserRole() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user.role : null;
}
const AdminLayout = ({ children }) => {
    const navigate = useNavigate();
    const userRole = getUserRole();
    const menuItems = [
        {
            key: "1",
            icon: <DashboardOutlined />,
            label: "Dashboard",
            onClick: () => {
                navigate("/admin");
            },
        },
        {
            key: "2",
            icon: <AppstoreOutlined />,
            label: "Categories",
            path: "/",
            children: [
                {
                    key: "3",
                    label: "Category List",
                    path: "/admin/categories",
                    onClick: () => {
                        navigate("/admin/categories");
                    },
                },
                {
                    key: "4",
                    label: "Create Category",
                    path: "/admin/categories/create",
                    onClick: () => {
                        navigate("/admin/categories/create");
                    },
                },
            ],
        },
        {
            key: "5",
            icon: <LaptopOutlined />,
            label: "Products",
            path: "/",
            children: [
                {
                    key: "6",
                    label: "Product List",
                    path: "/admin/products",
                    onClick: () => {
                        navigate("/admin/products");
                    },
                },
                {
                    key: "7",
                    label: "Create Product",
                    path: "/admin/products/create",
                    onClick: () => {
                        navigate("/admin/products/create");
                    },
                },
            ],
        },
        {
            key: "8",
            icon: <BarcodeOutlined />,
            label: "Coupons",
            path: "/",
            children: [
                {
                    key: "9",
                    label: "Coupon List",
                    path: "/admin/coupons",
                    onClick: () => {
                        navigate("/admin/coupons");
                    },
                },
                {
                    key: "10",
                    label: "Create Coupon",
                    path: "/admin/coupons/create",
                    onClick: () => {
                        navigate("/admin/coupons/create");
                    },
                },
            ],
        },
        {
            key: "11",
            icon: <UserOutlined />,
            label: "User List",
            path: "/",
            onClick: () => {
                navigate("/admin/users");
            },
        },
        {
            key: "12",
            icon: <ShoppingCartOutlined />,
            label: "Orders",
            path: "/",
            onClick: () => {
                navigate("/admin/orders");
            },
        },
        {
            key: "13",
            icon: <RollbackOutlined />,
            label: "Homepage",

            onClick: () => {
                // navigate("/");
                window.location.href = "/";
            },
        },
    ];

    if (userRole === "admin") {
        return (
            <div className="admin-layout">
                <Layout style={{ minHeight: "100vh" }}>
                    <Sider width={200} theme="dark">
                        <Menu mode="vertical" items={menuItems} style={{ height: "100%" }} />
                    </Sider>
                    <Layout>
                        <Header>
                            <div style={{ display: "flex", justifyContent: "space-between", color: "white" }}>
                                <h2>Admin Panel</h2>
                            </div>
                        </Header>
                        <Content>
                            <div className="site-layout-background" style={{ padding: "24px 50px", minHeight: 360 }}>
                                {children}
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    } else {
        return (window.location.href = "/");
    }
};

export default AdminLayout;
