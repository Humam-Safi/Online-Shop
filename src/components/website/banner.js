import React, { useState, useEffect } from "react";
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Wood & Cloth Sofa",
      description: "Experience the perfect blend of comfort and style with our handcrafted wood and cloth sofa. Made with premium materials and expert craftsmanship for lasting quality.",
      image: require("../../Assets/Images/71VLkZYkqPL._AC_SL1500_.jpg"),
      alt: "Wood and Cloth Sofa"
    },
    {
      title: "Modern Dining Set", 
      description: "Elegant dining furniture perfect for your home. Premium quality materials and craftsmanship.",
      image: require("../../Assets/Images/71h7YwbxxIL._AC_SL1500_.jpg"), // Replace with actual image
      alt: "Modern Dining Set"
    },
    {
      title: "Luxury Bedroom Collection",
      description: "Transform your bedroom with our luxury collection. Comfort meets style.",
      image: require("../../Assets/Images/bed.jpg"), // Replace with actual image
      alt: "Luxury Bedroom Collection" 
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-5 banner d-none d-md-block">
      <div className="d-flex flex-column flex-md-row justify-content-between" style={{
        transition: "all 0.5s ease-in-out"
      }}>
        <div className="text col-12 col-md-6 pe-md-4" style={{
          opacity: 1,
          animation: "fadeIn 0.5s ease-in"
        }}>
          <h1 className="responsive-heading" style={{
            fontSize: "calc(1.5rem + 2vw)",
            marginBottom: "1rem"
          }}>{slides[currentSlide].title}</h1>
          <p className="responsive-text" style={{
            fontSize: "calc(0.9rem + 0.5vw)", 
            marginBottom: "2rem"
          }}>{slides[currentSlide].description}</p>
          <button className="btn-2 responsive-button"
            style={{
              maxWidth:"200px",
              width:"100%"
            }}
          >
            Buy Now
          </button>
        </div>
        <div className="image col-12 col-md-6 d-flex justify-content-center align-items-center">
          <img
            className="img-fluid"
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            style={{
              animation: "slideIn 0.5s ease-in",
              maxHeight: "400px",
              objectFit: "contain"
            }}
          />
        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Banner;
