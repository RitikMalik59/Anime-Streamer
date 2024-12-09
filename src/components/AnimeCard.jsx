// src/components/AnimeCard.jsx
import React from "react";
import { Card } from "react-bootstrap";
import "../customCSS/AnimeCard.css";
import { useNavigate } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  const navigate = useNavigate();
  // const isDubbed = anime.title_english && anime.title_english !== anime.title;
  const isDubbed = anime.title_english;

  const handleClick = () => {
    navigate(`/anime/${anime.mal_id}`, { state: { anime } });
  };
  const truncateText = (text, maxLength) => {
    if (!text) return "No synopsis available";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // console.log(anime);

  return (
    <Card
      className="anime-card"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <div className="anime-image-wrapper">
        <Card.Img
          variant="top"
          src={anime.images.webp.large_image_url}
          alt={anime.title}
        />
        <div className="anime-hover-info">
          <h5>{anime.title}</h5>
          <p>Episodes: {anime.episodes || "N/A"}</p>
          <p>Aired: {anime.aired.string || "N/A"}</p>
          {isDubbed ? (
            <span className="badge bg-success">Dubbed/Subbed</span>
          ) : (
            <span className="badge bg-info">Subbed</span>
          )}
          {/* <p>{anime.type}</p> */}
          <p className="anime-synopsis">{truncateText(anime.synopsis, 120)}</p>
        </div>
      </div>
      <Card.Body>
        <Card.Title className="text-truncate">{anime.title}</Card.Title>
        <p>{anime.aired.prop.from.year || "N/A"}</p>
      </Card.Body>
    </Card>
  );
};

export default AnimeCard;
