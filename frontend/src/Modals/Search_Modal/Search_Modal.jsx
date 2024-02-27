/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./Search_Modal.css";
import { message } from "antd";
import { Link } from "react-router-dom";

const Search_Modal = (props) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const [searchResult, setSearchResult] = useState(undefined);

    const calculateDiscountedPrice = (item) => {
        const originalPrice = item.price.current;
        const discountedPrice = originalPrice - originalPrice * (item.price.discount / 100);
        return discountedPrice;
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const productName = e.target[0].value;

        if (productName.trim().length == 0) {
            message.warning("You did not type any character");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/api/products/search/${productName.trim()}`);

            if (response.ok) {
                const data = await response.json();
                setSearchResult(data);
            } else {
                message.error("Data could not be retrieved");
            }
        } catch (error) {
            console.log(error);
            message.error("Data could not be retrieved");
        }
    };

    return (
        <React.Fragment>
            <div className={`modal-search ${props.searchModalShow}`}>
                <div className="modal-wrapper">
                    <h3 className="modal-title">Search for products</h3>
                    <p className="modal-text">Start typing to see products you are looking for.</p>
                    <form className="search-form" onSubmit={handleSearch}>
                        <input type="text" placeholder="Search a product" />
                        <button>
                            <i className="bi bi-search"></i>
                        </button>
                    </form>
                    <div className="search-results">
                        <div className="search-heading">
                            <h2>Results From Products</h2>
                        </div>
                        <div
                            className="results"
                            style={{
                                justifyContent: "center",
                                display: `${searchResult?.length === 0 || !searchResult ? "flex" : "grid"}`,
                            }}
                        >
                            {searchResult && searchResult.length > 0 ? (
                                searchResult.map((item) => {
                                    const discountedPrice = calculateDiscountedPrice(item);
                                    return (
                                        <Link to={`product/${item._id}`} className="result-item" key={item._id}>
                                            <img src={item.img[0]} className="search-thumb" alt="" />
                                            <div className="search-info">
                                                <h4>{item.name}</h4>
                                                {/* <span className="search-sku">SKU: PD0016</span> */}
                                                <span className="search-price">${discountedPrice}</span>
                                            </div>
                                        </Link>
                                    );
                                })
                            ) : searchResult && searchResult.length == 0 ? (
                                <h2>Searched product is not found 😥</h2>
                            ) : (
                                <h2>Search for products...</h2>
                            )}
                        </div>
                    </div>
                    <i className="bi bi-x-circle" id="close-search" onClick={() => props.setSearchModalShow("")}></i>
                </div>
                <div className="modal-overlay" onClick={() => props.setSearchModalShow("")}></div>
            </div>
        </React.Fragment>
    );
};

export default Search_Modal;
