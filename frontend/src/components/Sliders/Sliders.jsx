/* eslint-disable react/prop-types */
import Slider_Item from "./Slider_Item";
import "./Sliders.css";
import Slider from "react-slick";

const NextButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="slider-next-button slider-buttons">
            <i className="bi bi-chevron-right"></i>
        </button>
    );
};
const PrevButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="slider-prev-button slider-buttons">
            <i className="bi bi-chevron-left"></i>
        </button>
    );
};

const sliderSettings = {
    dots: true,
    infiinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
};

const sliderImages = [
    "https://e-commerce-udemy.netlify.app/img/slider/slider1.jpg",
    "https://e-commerce-udemy.netlify.app/img/slider/slider2.jpg",
    "https://e-commerce-udemy.netlify.app/img/slider/slider3.jpg",
];

const Sliders = () => {
    // return (
    //     <section className="slider">
    //         <div className="slider-elements">
    //             {currentSlide == 0 && <Slider_Item imageSrc={"img/slider/slider1.jpg"} />}
    //             <div className="slider-buttons">
    //                 <button onClick={prevSlide}>
    //                     <i className="bi bi-chevron-left"></i>
    //                 </button>
    //                 <button onClick={nextSlide}>
    //                     <i className="bi bi-chevron-right"></i>
    //                 </button>
    //             </div>
    //         </div>
    //     </section>
    // );
    // ! ----------------------------------------- Deneme kodlar-------------------

    return (
        <section className="slider">
            <div className="slider-elements">
                <Slider {...sliderSettings}>
                    {sliderImages.map((item, index) => {
                        return <Slider_Item imageSrc={item} key={index} />;
                    })}
                </Slider>
            </div>
        </section>
    );
};

export default Sliders;
