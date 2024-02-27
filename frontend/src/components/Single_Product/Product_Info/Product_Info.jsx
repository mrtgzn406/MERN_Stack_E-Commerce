/* eslint-disable react/prop-types */
import "./Product_Info.css";
import { useContext } from "react";
import { CartContext } from "../../../context/CartProvider";
const Product_Info = ({ singleProduct }) => {
    const { addToCart, CartItems } = useContext(CartContext);

    const originalPrice = singleProduct.price.current.toFixed(2);
    const discountedPrice = (
        singleProduct.price.current -
        singleProduct.price.current * (singleProduct.price.discount / 100)
    ).toFixed(2);

    const filteredCart = CartItems.find((item) => item._id === singleProduct._id);

    return (
        <div className="product-info">
            <h1 className="product-title">{singleProduct.name}</h1>
            <div className="product-review">
                {/* <ul className="product-star">
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
                </ul> */}
                {/* <span>2 reviews</span> */}
            </div>
            <div className="product-price">
                <s className="old-price">${originalPrice}</s>
                <strong className="new-price">${discountedPrice}</strong>
            </div>
            <p className="product-description" dangerouslySetInnerHTML={{ __html: singleProduct.description }}></p>
            <form className="variations-form">
                <div className="variations">
                    <div className="colors">
                        <div className="colors-label">
                            <span>Color</span>
                        </div>
                        <div className="colors-wrapper">
                            {singleProduct.colors.map((color, index) => {
                                return (
                                    <div className="color-wrapper" key={index}>
                                        <label style={{ backgroundColor: `${color}` }}>
                                            <input type="radio" name="product-color" />
                                        </label>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="values">
                        <div className="values-label">
                            <span>Size</span>
                        </div>
                        <div className="values-list">
                            {singleProduct.sizes.map((size, index) => {
                                return <span key={index}>{size.toUpperCase()}</span>;
                            })}
                        </div>
                    </div>
                    <div className="cart-button">
                        {/* <input type="number" defaultValue="1" min="1" id="quantity" /> */}
                        <button
                            disabled={filteredCart}
                            className="btn btn-lg btn-primary"
                            id="add-to-cart"
                            type="button"
                            onClick={() => addToCart(singleProduct)}
                        >
                            Add to cart
                        </button>
                    </div>
                    <div className="product-extra-buttons">
                        <a href="#">
                            <i className="bi bi-globe"></i>
                            <span>Size Guide</span>
                        </a>
                        <a href="#">
                            <i className="bi bi-heart"></i>
                            <span>Add to Wislist</span>
                        </a>
                        <a href="#">
                            <i className="bi bi-share"></i>
                            <span>Share this Product</span>
                        </a>
                    </div>
                </div>
            </form>
            {/* <div className="divider"></div>
            <div className="product-meta">
                <div className="product-sku">
                    <span>SKU:</span>
                    <strong>BE45VGRT</strong>
                </div>
                <div className="product-categories">
                    <span>Categories:</span>
                    <strong>Pants , Women</strong>
                </div>
                <div className="product-tags">
                    <span>Tags:</span>
                    <a href="#">black</a>,<a href="#">white</a>
                </div>
            </div> */}
        </div>
    );
};

export default Product_Info;
