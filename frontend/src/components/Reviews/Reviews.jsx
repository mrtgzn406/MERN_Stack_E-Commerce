/* eslint-disable react/prop-types */
import Reviews_Item from "./Reviews_Item";
import Reviews_Form from "./Reviews_Form";
import "./Reviews.css";
import { useEffect, useState } from "react";
import { message } from "antd";
const Reviews = ({ activeTab, singleProduct, setSingleProduct }) => {
    const [users, setUsers] = useState([]);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    const thisReview = [];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/users`);

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                } else {
                    message.error("Users data fetching is failed!");
                }
            } catch (error) {
                console.log("Users data fetching is failed!:", error);
            }
        };
        fetchUsers();
    }, [apiUrl]);

    singleProduct &&
        singleProduct.reviews.forEach((review) => {
            const matchingUsers = users?.filter((user) => user._id === review.user);

            matchingUsers.forEach((matchingUser) => {
                thisReview.push({
                    review: review,
                    user: matchingUser,
                });
            });
        });
    return (
        <div className={`tab-panel-reviews content ${activeTab == "reviews" && "active"}`} name="reviews">
            {singleProduct && singleProduct.reviews.length > 0 ? (
                <div>
                    <h3>{thisReview ? thisReview.length : 0} Reviews Found </h3>
                    <div className="comments">
                        <ol className="comment-list">
                            {thisReview.map((item, index) => {
                                return <Reviews_Item key={index} item={item} reviewItem={item} />;
                            })}
                        </ol>
                    </div>
                </div>
            ) : (
                <h2>No reviews yet...</h2>
            )}

            <div className="review-form-wrapper">
                <h2>Add a review</h2>
                <Reviews_Form singleProduct={singleProduct} setSingleProduct={setSingleProduct} />
            </div>
        </div>
    );
};

export default Reviews;
