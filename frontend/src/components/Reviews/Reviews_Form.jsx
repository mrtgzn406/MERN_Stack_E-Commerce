/* eslint-disable react/prop-types */
import { useState } from "react";
import { message } from "antd";
const Reviews_Form = ({ singleProduct, setSingleProduct }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const apiUrl = import.meta.env.VITE_API_BASE_URL;

    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    const handleRating = (e, givenRating) => {
        e.preventDefault();
        setRating(givenRating);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (rating === 0) {
            return message.warning("Please select a rating");
        }
        if (review.trim().length <= 0) {
            return message.warning("You must type something");
        }
        const formData = {
            reviews: [
                ...singleProduct.reviews,
                {
                    text: review,
                    rating: parseInt(rating),
                    user: user.id || user._id,
                },
            ],
        };

        try {
            const res = await fetch(`${apiUrl}/api/products/${singleProduct._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                message.error("Bir şeyler yanlış gitti.");
                return;
            }

            const data = await res.json();
            setSingleProduct(data);
            setReview("");
            setRating(0);
            message.success("Yorum başarıyla eklendi.");
        } catch (error) {
            console.log(error);
            message.error("Bir şeyler yanlış gitti.");
        }
    };
    return (
        <form className="comment-form" onSubmit={handleSubmitForm}>
            <p className="comment-notes">
                Your email address will not be published. Required fields are marked
                <span className="required">*</span>
            </p>
            <div className="comment-form-rating">
                <label>
                    Your rating
                    <span className="required">*</span>
                </label>
                <div className="stars">
                    <a href="#" className={`star ${rating === 1 && "active"}`} onClick={(e) => handleRating(e, 1)}>
                        <i className="bi bi-star-fill"></i>
                    </a>
                    <a href="#" className={`star ${rating === 2 && "active"}`} onClick={(e) => handleRating(e, 2)}>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                    </a>
                    <a href="#" className={`star ${rating === 3 && "active"}`} onClick={(e) => handleRating(e, 3)}>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                    </a>
                    <a href="#" className={`star ${rating === 4 && "active"}`} onClick={(e) => handleRating(e, 4)}>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                    </a>
                    <a href="#" className={`star ${rating === 5 && "active"}`} onClick={(e) => handleRating(e, 5)}>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                    </a>
                </div>
            </div>
            <div className="comment-form-comment form-comment">
                <label htmlFor="comment">
                    Your review
                    <span className="required">*</span>
                </label>
                <textarea
                    value={review}
                    id="comment"
                    cols="50"
                    rows="10"
                    onChange={(e) => setReview(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="comment-form-author form-comment">
                <label htmlFor="name">
                    Name
                    <span className="required">*</span>
                </label>
                <input id="name" type="text" />
            </div>
            <div className="comment-form-email form-comment">
                <label htmlFor="email">
                    Email
                    <span className="required">*</span>
                </label>
                <input id="email" type="email" />
            </div>
            <div className="comment-form-cookies">
                <input id="cookies" type="checkbox" />
                <label htmlFor="cookies">
                    Save my name, email, and website in this browser for the next time I comment.
                    <span className="required">*</span>
                </label>
            </div>
            <div className="form-submit">
                <input type="submit" className="btn submit" />
            </div>
        </form>
    );
};

export default Reviews_Form;
