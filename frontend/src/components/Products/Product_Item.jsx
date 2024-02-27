/* eslint-disable react/prop-types */
import { useContext } from "react";
import "./Product_Item.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartProvider";

const Product_Item = ({ product }) => {
    const { CartItems, addToCart } = useContext(CartContext);

    const filteredCart = CartItems.find((item) => product._id === item._id);

    const originalPrice = product.price.current.toFixed(2);
    const discountedPrice = (product.price.current - product.price.current * (product.price.discount / 100)).toFixed(2);

    return (
        <div className="product-item glide__slide glide__slide--active">
            <div className="product-image">
                <a href="#">
                    <img src={product.img[0]} alt="" className="img1" />
                    <img src={product.img[1]} alt="" className="img2" />
                </a>
            </div>
            <div className="product-info">
                <a href="$" className="product-title">
                    {product.name}
                </a>
                <ul className="product-star">
                    <li>
                        <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                        <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                        <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                        <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                        <i className="bi bi-star-half"></i>
                    </li>
                </ul>
                <div className="product-prices">
                    <strong className="new-price">${discountedPrice}</strong>
                    <span className="old-price">${originalPrice}</span>
                </div>
                <span className="product-discount">-{product.discount}%</span>
                <div className="product-links">
                    <button className="add-to-cart" disabled={filteredCart} onClick={() => addToCart(product)}>
                        <i className="bi bi-basket-fill"></i>
                    </button>
                    <button>
                        <i className="bi bi-heart-fill"></i>
                    </button>
                    <Link to={`/product/${product._id}`} className="product-link">
                        <i className="bi bi-eye-fill"></i>
                    </Link>
                    <a href="#">
                        <i className="bi bi-share-fill"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Product_Item;
