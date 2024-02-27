/* eslint-disable react/prop-types */
import "./Brand_Item.css";
const Brand_Item = ({ item }) => {
    return (
        <li className="brand-item">
            <a href="#">
                <img src={item} alt="" />
            </a>
        </li>
    );
};

export default Brand_Item;
