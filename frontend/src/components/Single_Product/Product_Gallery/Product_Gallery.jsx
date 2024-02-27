/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./Product_Gallery.css";
import Slider from "react-slick";

function NextBtn({ onClick }) {
    return (
        <button className="glide__arrow glide__arrow--right" onClick={onClick}>
            <i className="bi bi-chevron-right"></i>
        </button>
    );
}

function PrevBtn({ onClick }) {
    return (
        <button className="glide__arrow glide__arrow--left" onClick={onClick}>
            <i className="bi bi-chevron-left"></i>
        </button>
    );
}

const Product_Gallery = ({ singleProduct }) => {
    const [activeImage, setActiveImage] = useState({
        img: "",
        imgIndex: 0,
    });

    useEffect(() => {
        setActiveImage({ img: singleProduct.img[0], imgIndex: 0 });
    }, [singleProduct.img]);

    const sliderSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        nextArrow: <NextBtn />,
        prevArrow: <PrevBtn />,
    };
    return (
        <div className="product-gallery">
            <div className="single-image-wrapper">
                <img src={`${activeImage.img}`} id="single-image" alt="" />
            </div>
            <div className="product-thumb">
                <div className="glide__track" data-glide-el="track">
                    <ol className="gallery-thumbs glide__slides">
                        <Slider {...sliderSettings}>
                            {singleProduct.img.map((itemImg, index) => {
                                return (
                                    <li
                                        className="glide__slide glide__slide--active"
                                        onClick={() =>
                                            setActiveImage({
                                                img: itemImg,
                                                imgIndex: index,
                                            })
                                        }
                                        key={index}
                                    >
                                        <img
                                            src={`${itemImg}`}
                                            alt=""
                                            className={`img-fluid ${activeImage.imgIndex === index && "active"}`}
                                        />
                                    </li>
                                );
                            })}
                        </Slider>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Product_Gallery;
