import { useEffect, useState } from "react";
import { message } from "antd";
import "./Categories.css";
import Category_Item from "./Category_Item";

const Categories = () => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/categories`, { method: "GET" });
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    message.error("Category data fetching is failed!");
                }
            } catch (error) {
                console.log("Category data fetching is failed!: ", error);
            }
        };
        fetchCategories();
    }, [apiUrl]);

    return (
        <section className="categories">
            <div className="container">
                <div className="section-title">
                    <h2>All Categories</h2>
                    <p>Summer Collection New Morden Design</p>
                </div>
                <ul className="category-list">
                    {categories.map((category) => {
                        return <Category_Item key={category._id} category={category} />;
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Categories;
