/* eslint-disable react/prop-types */
import "./Category_Item.css";
const Category_Item = ({ category }) => {
    return (
        <li className="category-item">
            <a href="#">
                <img src={category.img} alt="Category" className="category-image" />
                <span className="category-title">{category.name}</span>
            </a>
        </li>
    );
};

export default Category_Item;
