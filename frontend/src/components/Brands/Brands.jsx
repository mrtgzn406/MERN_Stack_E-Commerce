import Brand_Item from "./Brand_Item";
import "./Brands.css";
const Brands = () => {
    const brandsImage = [
        "https://e-commerce-udemy.netlify.app/img/brands/brand1.png",
        "https://e-commerce-udemy.netlify.app/img/brands/brand2.png",
        "https://e-commerce-udemy.netlify.app/img/brands/brand3.png",
        "https://e-commerce-udemy.netlify.app/img/brands/brand4.png",
        "https://e-commerce-udemy.netlify.app/img/brands/brand5.png",
    ];
    return (
        <section className="brands">
            <div className="container">
                <ul className="brand-list">
                    {brandsImage.map((item, index) => {
                        return <Brand_Item item={item} key={index} />;
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Brands;
