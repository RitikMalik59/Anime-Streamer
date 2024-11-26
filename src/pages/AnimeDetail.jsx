// src/pages/AnimeDetail.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../customCSS/AnimeDetail.css";

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/full`
        );
        setAnime(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
        setError("Failed to load anime details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  if (loading) {
    return (
      <Spinner
        animation="border"
        variant="light"
        className="d-flex justify-content-center my-5"
      />
    );
  }

  if (error) {
    return <div className="text-danger text-center my-5">{error}</div>;
  }

  return (
    <div className="anime-detail bg-black">
      <div
        className="anime-banner"
        style={{
          backgroundImage: `url(${anime.trailer.images.maximum_image_url})`,
        }}
      >
        <div className="anime-overlay">
          <Container>
            <Row className="align-items-center">
              <Col lg={12} md={9}>
                <h1 className="anime-title">{anime.title}</h1>
                <p className="anime-genres">
                  {anime.genres.map((genre) => genre.name).join(", ")}
                </p>
                <p className="anime-score">⭐ {anime.score}</p>
                <p className="anime-synopsis">{anime.synopsis}</p>
                <Button variant="primary" className="me-3">
                  Watch Now
                </Button>
                <Button variant="outline-light">Add to Watchlist</Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Detailed Information Section */}
      <Container className="anime-info-section mt-4">
        <Row>
          <Col md={6}>
            <h2>Information</h2>
            <p>
              <strong>Status:</strong> {anime.status || "Unknown"}
            </p>
            <p>
              <strong>Episodes:</strong> {anime.episodes}
            </p>
            <p>
              <strong>Rating:</strong> {anime.rating}
            </p>
            <p>
              <strong>Producers:</strong>{" "}
              {anime.producers.length > 0
                ? anime.producers.map((prod) => prod.name).join(", ")
                : "N/A"}
            </p>
          </Col>
          <Col md={6}>
            <h2>Additional Info</h2>
            <p>
              <strong>Duration:</strong> {anime.duration}
            </p>
            <p>
              <strong>Type:</strong> {anime.type}
            </p>
            <p>
              <strong>Premiered:</strong> {anime.premiered}
            </p>
          </Col>
        </Row>
      </Container>

      {/* Trailer Section */}
      <Container className="anime-trailer-section mt-5">
        <h2>Trailer</h2>
        {anime.trailer.embed_url ? (
          <div className="video-container">
            <iframe
              src={anime.trailer.embed_url}
              title="Anime Trailer"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>Trailer not available</p>
        )}
      </Container>
    </div>
  );
};

export default AnimeDetail;
