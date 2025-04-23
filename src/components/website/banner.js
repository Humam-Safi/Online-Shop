import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const slides = [
    {
      image: require("../../Assets/Images/banner4.avif"),
    },
    {
      image: require("../../Assets/Images/banner2.jpg"),
    },
    {
      image: require("../../Assets/Images/banner3.jpg"),
    },
    {
      image: require("../../Assets/Images/black-background-product-photography-mini (1).jpg"),
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="banner-container">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="slide-image"
            />
          </div>
        ))}
      </Slider>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }

        .banner-container {
          padding: 0 !important;
          margin: 0 !important;
          width: 100vw;
          height: 90vh;
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          background: black;
        }

        .banner-container .slick-slider,
        .banner-container .slick-list,
        .banner-container .slick-track {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .slide {
          height: 60vh;
          width: 100vw;
          margin: 0;
          padding: 0;
          position: relative;
          display: flex !important;
          align-items: center;
          justify-content: center;
          background: black;
        }

        .slide-image {
          width: auto;
          height: 100%;
          max-width: 100%;
          object-fit: contain;
          display: block;
          margin: 0;
          padding: 0;
        }

        @media (max-width: 768px) {
          .banner-container,
          .slide {
            height: 40vh;
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;
