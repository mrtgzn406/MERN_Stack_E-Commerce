/* eslint-disable react/prop-types */
import Breadcrumb from "./Breadcrumb/Breadcrumb";
import Product_Gallery from "./Product_Gallery/Product_Gallery";
import Product_Info from "./Product_Info/Product_Info";
import Product_Tabs from "./Product_Tabs/Product_Tabs";

import "./Single_Product.css";
const Single_Product = ({ singleProduct, setSingleProduct }) => {
    return (
        <section className="single-product">
            <div className="container">
                <div className="single-product-wrapper">
                    {/* <!-- breadcrumb start --> */}
                    <Breadcrumb />
                    {/* <!-- breadcrumb end --> */}

                    {/* <!-- site main start --> */}
                    <div className="single-content">
                        <main className="site-main">
                            <Product_Gallery singleProduct={singleProduct} />
                            <Product_Info singleProduct={singleProduct} />
                        </main>
                    </div>
                    {/* <!-- site main end --> */}

                    {/* <!-- tabs start --> */}
                    <Product_Tabs singleProduct={singleProduct} setSingleProduct={setSingleProduct} />
                    {/* <!-- tabs end --> */}
                </div>
            </div>
        </section>
    );
};

export default Single_Product;
