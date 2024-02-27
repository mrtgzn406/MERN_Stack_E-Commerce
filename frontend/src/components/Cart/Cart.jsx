import React, { useContext, useState } from "react";
import "./Cart.css";
import Cart_Item from "./Cart_Item";
import { CartContext } from "../../context/CartProvider";
import { Spin, message } from "antd";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
    const { CartItems, setCartItems } = useContext(CartContext);
    const [couponCode, setCouponCode] = useState("");
    const [loading, setLoading] = useState(false);

    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const stripePublicKey = import.meta.env.VITE_API_STRIPE_PUBLIC_KEY;
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    const cartItemTotals = CartItems.map((item) => {
        const itemTotal = (item.price.current - item.price.current * (item.price.discount / 100)) * item.quantity;
        return itemTotal;
    });

    const subTotals = cartItemTotals.reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
    }, 0);

    const [fastCargoChecked, setFastCargoChecked] = useState(false);

    const cargoCheckedFunction = () => {
        if (subTotals) setFastCargoChecked(!fastCargoChecked);
    };

    const applyCoupon = async () => {
        if (couponCode.trim().length == 0) {
            return message.warning("You must type some characters");
        }

        try {
            const response = await fetch(`${apiUrl}/api/coupons/code/${couponCode}`);
            if (!response.ok) {
                return message.error("Coupon code you entered is wrong, coupon code could not be applied");
            }

            const discountRateData = await response.json();

            const updatedCartItems = CartItems.map((item) => {
                const updateItemPrice = item.price.current * (1 - discountRateData / 100);
                return {
                    ...item,
                    price: {
                        ...item.price,
                        current: updateItemPrice,
                    },
                };
            });
            setCartItems(updatedCartItems);
            message.success(`${couponCode} coupon code applied successfully`);
        } catch (error) {
            console.log(error);
            message.error("Coupon code error");
        }
    };

    const cargoFee = 15;
    const cartTotals = fastCargoChecked ? (subTotals + cargoFee).toFixed(2) : subTotals.toFixed(2);

    const handlePayment = async () => {
        if (!user) {
            return message.info("You must login your account to make payment");
        }

        const body = {
            products: CartItems,
            user: user,
            cargoFee: fastCargoChecked ? cargoFee : 0,
        };

        try {
            setLoading(true);
            const stripe = await loadStripe(stripePublicKey);

            const response = await fetch(`${apiUrl}/api/payment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                console.log(response);
                return message.error("Payment could not be realised!");
            }

            const session = await response.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                throw new Error(result.error.message);
            }
        } catch (error) {
            console.log(error);
            message.error("Payment error!");
        } finally {
            setLoading(false);
        }
    };
    return (
        <React.Fragment>
            <section className="cart-page">
                <div className="container">
                    {CartItems.length > 0 ? (
                        <div className="cart-page-wrapper">
                            <form className="cart-form">
                                <div className="shop-table-wrapper">
                                    <table className="shop-table">
                                        <thead>
                                            <tr>
                                                <th className="product-thumbnail">&nbsp;</th>
                                                <th className="product-thumbnail">&nbsp;</th>
                                                <th className="product-name">Product Name</th>
                                                <th className="product-price">Price</th>
                                                <th className="product-quantity">Quantity</th>
                                                <th className="product-subtotal">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="cart-wrapper">
                                            {CartItems.map((cartItem) => {
                                                return <Cart_Item cartItem={cartItem} key={cartItem._id} />;
                                            })}
                                        </tbody>
                                    </table>

                                    <div className="actions-wrapper">
                                        <div className="coupon">
                                            <input
                                                type="text"
                                                className="input-text"
                                                placeholder="Coupon code"
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                value={couponCode}
                                            />
                                            <button className="btn" type="button" onClick={applyCoupon}>
                                                Apply Coupon
                                            </button>
                                        </div>
                                        {/* <div className="update-cart">
                                            <button className="btn">Update Cart</button>
                                        </div> */}
                                    </div>
                                </div>
                            </form>
                            <div className="cart-collaterals">
                                <Spin spinning={loading}>
                                    <div className="cart-totals">
                                        <h2>Cart totals</h2>
                                        <table>
                                            <tbody>
                                                <tr className="cart-subtotal">
                                                    <th>Subtotal</th>
                                                    <td>
                                                        <span id="subtotal">${subTotals.toFixed(2)}</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Shipping</th>
                                                    <td>
                                                        <ul>
                                                            <li>
                                                                <label>
                                                                    Fast Cargo: ${cargoFee}
                                                                    <input
                                                                        type="checkbox"
                                                                        id="fast-cargo"
                                                                        checked={fastCargoChecked}
                                                                        onChange={() => cargoCheckedFunction()}
                                                                    />
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <a href="#">Change Address</a>
                                                            </li>
                                                        </ul>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Total</th>
                                                    <td>
                                                        <strong id="cart-total">${cartTotals}</strong>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="checkout">
                                            <button className="btn btn-lg" onClick={handlePayment}>
                                                Proceed to checkout
                                            </button>
                                        </div>
                                    </div>
                                </Spin>
                            </div>
                        </div>
                    ) : (
                        <h2>Cart is empty, please add some product...</h2>
                    )}
                </div>
            </section>
        </React.Fragment>
    );
};

export default Cart;
