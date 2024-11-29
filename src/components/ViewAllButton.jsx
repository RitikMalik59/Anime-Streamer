// src/components/ViewAllButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const ViewAllButton = ({ listingType }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/animeListing/${listingType}`);
  };

  return (
    <Button variant="primary" onClick={handleClick}>
      View All
    </Button>
    // <button className="btn btn-outline-light" onClick={handleClick}>
    //   View All
    // </button>
  );
};

export default ViewAllButton;
