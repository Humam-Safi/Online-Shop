import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const IconWrapper = styled.div`
  background: #00bcd4;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: white;
    font-size: 20px;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-3px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  &:hover svg {
    animation: float 1s ease-in-out infinite;
  }
`;

const BrandText = styled.div`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: white;
  letter-spacing: 1px;

  span {
    color: #00bcd4;
  }

  .tagline {
    font-size: 12px;
    color: white;
    font-weight: 400;
    letter-spacing: 0.5px;
    margin-top: -5px;
  }
`;

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <LogoContainer onClick={handleClick}>
      <IconWrapper>
        <FaShoppingCart />
      </IconWrapper>
      <BrandText>
        <div>
          <span>H</span>umam
        </div>
        <div className="tagline">Your Shopping Destination</div>
      </BrandText>
    </LogoContainer>
  );
};

export default Logo;
