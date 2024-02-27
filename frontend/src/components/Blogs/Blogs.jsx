import Blog_Item from "./Blog_Item";
import "./Blogs.css";
const Blogs = () => {
    const blogItemImages = [
        "https://e-commerce-udemy.netlify.app/img/blogs/blog1.jpg",
        "https://e-commerce-udemy.netlify.app/img/blogs/blog2.jpg",
        "https://e-commerce-udemy.netlify.app/img/blogs/blog3.jpg",
        "https://e-commerce-udemy.netlify.app/img/blogs/blog4.jpg",
        "https://e-commerce-udemy.netlify.app/img/blogs/blog5.jpg",
        "https://e-commerce-udemy.netlify.app/img/blogs/blog6.jpg",
    ];
    return (
        <section className="blogs">
            <div className="container">
                <div className="section-title">
                    <h2>From Our Blog</h2>
                    <p>Summer Collection New Morden Design</p>
                </div>
                <ul className="blog-list">
                    {blogItemImages.map((item, index) => {
                        return <Blog_Item item={item} key={index} />;
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Blogs;
