import { createContext, useEffect, useState } from "react";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [CartItems, setCartItems] = useState(
        localStorage.getItem("CartItems") ? JSON.parse(localStorage.getItem("CartItems")) : []
    );

    function addToCart(CartItem) {
        // setCartItems([...CartItems, CartItem]); // 1. yol
        setCartItems((prevCartItems) => [
            ...prevCartItems,
            { ...CartItem, quantity: CartItem.quantity ? CartItem.quantity : 1 },
        ]); // 2. yol
    }

    function removeFromCart(itemId) {
        const filteredCartItems = CartItems.filter((item) => {
            return item._id !== itemId;
        });
        setCartItems(filteredCartItems);
    }

    function quantityFunction(event, cartItem) {
        const changedCartItems = CartItems.map((item) => {
            if (item._id === cartItem._id) {
                return { ...item, quantity: parseInt(event.target.value) };
            } else {
                return item;
            }
        });

        setCartItems(changedCartItems);
    }

    useEffect(() => {
        localStorage.setItem("CartItems", JSON.stringify(CartItems));
    }, [CartItems]);

    return (
        <CartContext.Provider
            value={{
                CartItems: CartItems,
                setCartItems: setCartItems,
                addToCart: addToCart,
                removeFromCart: removeFromCart,
                quantityFunction: quantityFunction,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
