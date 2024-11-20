// src/components/Banner.jsx
import React from "react";
import { Container } from "react-bootstrap";
import "../customCSS/Banner.css"; // Custom styles for the banner
import bannerImage from "../assets/banner.jpg"; // Ensure you have a banner image

const Banner = () => {
  return (
    <div
      className="banner d-flex align-items-center"
      style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "60vh",
        position: "relative",
        color: "white",
      }}
    >
      <Container>
        <h1>Welcome to AnimeStream</h1>
        <p>Your ultimate destination for streaming anime.</p>
        {/* You can add a call-to-action button here */}
      </Container>
      <div className="overlay"></div>
    </div>
  );
};

export default Banner;
