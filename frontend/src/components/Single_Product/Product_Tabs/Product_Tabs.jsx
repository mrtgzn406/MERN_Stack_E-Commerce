/* eslint-disable react/prop-types */
import { useState } from "react";
import Reviews from "../../Reviews/Reviews";
import "./Product_Tabs.css";
const Product_Tabs = ({ singleProduct, setSingleProduct }) => {
    const [activeTab, setActiveTab] = useState("description");

    function handleTabClick(e, tab) {
        e.preventDefault();
        setActiveTab(tab);
    }

    return (
        <div className="single-tabs">
            <ul className="tab-list">
                <li>
                    <a
                        href=""
                        className={`tab-button ${activeTab == "description" && "active"}`}
                        onClick={(e) => handleTabClick(e, "description")}
                    >
                        Description
                    </a>
                </li>
                <li>
                    <a
                        href=""
                        className={`tab-button ${activeTab == "info" && "active"}`}
                        onClick={(e) => handleTabClick(e, "info")}
                    >
                        Additional information
                    </a>
                </li>
                <li>
                    <a
                        href=""
                        className={`tab-button ${activeTab == "reviews" && "active"}`}
                        onClick={(e) => handleTabClick(e, "reviews")}
                    >
                        Reviews
                    </a>
                </li>
            </ul>
            <div className="tab-panel">
                <div
                    className={`tab-panel-descriptions content ${activeTab == "description" && "active"}`}
                    name="description"
                >
                    <div dangerouslySetInnerHTML={{ __html: singleProduct.description }}></div>
                </div>
                <div className={`tab-panel-information content ${activeTab == "info" && "active"}`} name="info">
                    <h3>Additional information</h3>
                    <table>
                        <tbody>
                            <tr>
                                <th>Color</th>
                                <td>
                                    {singleProduct.colors.map((color, index) => {
                                        if (index === singleProduct.colors.length - 1) {
                                            return <span key={index}>{color}</span>;
                                        } else {
                                            return <span key={index}>{color}, </span>;
                                        }
                                    })}
                                </td>
                            </tr>
                            <tr>
                                <th>Size</th>
                                <td>
                                    {singleProduct.sizes.map((size, index) => {
                                        if (index === singleProduct.sizes.length - 1) {
                                            return <span key={size}>{size}</span>;
                                        } else {
                                            return <span key={size}>{size}, </span>;
                                        }
                                    })}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Reviews activeTab={activeTab} singleProduct={singleProduct} setSingleProduct={setSingleProduct} />
            </div>
        </div>
    );
};

export default Product_Tabs;
