/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Product_Item from "./Product_Item";
import Slider from "react-slick";
import "./Products.css";
import { message } from "antd";

function NextBtn({ onClick }) {
    return (
        <button className="glide__arrow glide__arrow--right" onClick={onClick}>
            <i className="bi bi-chevron-right"></i>
        </button>
    );
}

function PrevBtn({ onClick }) {
    return (
        <button className="glide__arrow glide__arrow--left" onClick={onClick}>
            <i className="bi bi-chevron-left"></i>
        </button>
    );
}

const Products = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/products`, { method: "GET" });
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    message.error("Product data fetching is failed!");
                }
            } catch (error) {
                console.log("Product data fetching is failed!", error);
            }
        };
        fetchProducts();
    }, [apiUrl]);

    const sliderSettings = {
        dots: true,
        // infinite: true,
        speed: 300,
        slidesToShow: products.length >= 4 ? 4 : products.length,
        slidesToScroll: 1,
        nextArrow: <NextBtn />,
        prevArrow: <PrevBtn />,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <section className="products">
            <div className="container">
                <div className="section-title">
                    <h2>Featured Products</h2>
                    <p>Summer Collection New Morden Design</p>
                </div>
                <div className="product-wrapper product-carousel">
                    <Slider {...sliderSettings}>
                        {products.map((product) => {
                            return <Product_Item product={product} key={product._id} />;
                        })}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Products;
