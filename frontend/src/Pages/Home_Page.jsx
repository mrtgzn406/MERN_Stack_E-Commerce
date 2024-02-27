import React from "react";
import Sliders from "../components/Sliders/Sliders";
import Categories from "../components/Categories/Categories";
import Products from "../components/Products/Products";
import Campaigns from "../components/Campaigns/Campaigns";
import Blogs from "../components/Blogs/Blogs";
import Brands from "../components/Brands/Brands";
import Campaign_Single from "../components/Campaign_Single/Campaign_Single";

const Home_Page = () => {
    return (
        <React.Fragment>
            <Sliders />
            <Categories />
            <Products />
            <Campaigns />
            <Products />
            <Blogs />
            <Brands />
            <Campaign_Single />
        </React.Fragment>
    );
};

export default Home_Page;
