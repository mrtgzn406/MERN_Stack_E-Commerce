import { Button, Result } from "antd";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartProvider";

const Payment_Success_Page = () => {
    const { setCartItems } = useContext(CartContext);
    useEffect(() => {
        setCartItems([]);
    }, [setCartItems]);
    return (
        <div className="success-page">
            <div className="container">
                <Result
                    status="success"
                    title="Payment Successful"
                    subTitle="Your order has beeen successfully completed"
                    extra={[
                        <Link to={"/"} key={"home"}>
                            <Button type="primary">Homepage</Button>
                        </Link>,
                        <a href="/admin/orders" key={"orders"}>
                            <Button key="buy">My Orders</Button>
                        </a>,
                    ]}
                />
            </div>
        </div>
    );
};

export default Payment_Success_Page;
