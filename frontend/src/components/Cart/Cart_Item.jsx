/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { CartContext } from "../../context/CartProvider";

const Cart_Item = ({ cartItem }) => {
    const { removeFromCart, quantityFunction } = useContext(CartContext);

    let currentPrice = cartItem.price.current;
    const discountedPrice = currentPrice - currentPrice * (cartItem.price.discount / 100);

    return (
        <React.Fragment>
            <tr className="cart-item">
                <td></td> {/* Don't delete this empty <td> , it's necessary for alignment */}
                <td className="cart-image">
                    <img src={cartItem.img[0]} alt="" />
                    <i className="bi bi-x delete-cart" onClick={() => removeFromCart(cartItem._id)}></i>
                </td>
                <td>{cartItem.name}</td>
                <td>${discountedPrice.toFixed(2)}</td>
                <td className="product-quantity">
                    <input
                        type="number"
                        min={1}
                        max={10}
                        defaultValue={cartItem.quantity}
                        onKeyDown={(event) => event.preventDefault()}
                        onChange={(event) => quantityFunction(event, cartItem)}
                    ></input>
                </td>
                <td className="product-subtotal">${(cartItem.quantity * discountedPrice).toFixed(2)}</td>
            </tr>
        </React.Fragment>
    );
};

export default Cart_Item;
