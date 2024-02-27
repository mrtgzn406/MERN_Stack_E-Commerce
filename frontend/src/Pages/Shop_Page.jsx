import React from "react";

import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import Campaign_Single from "../components/Campaign_Single/Campaign_Single";

const Shop_Page = () => {
    return (
        <React.Fragment>
            <Categories />
            <Products />
            <Campaign_Single />
            <Products />
        </React.Fragment>
    );
};

export default Shop_Page;
