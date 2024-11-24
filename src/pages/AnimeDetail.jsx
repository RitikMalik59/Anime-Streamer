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
    <div className="anime-detail">
      <div
        className="anime-banner"
        style={{
          backgroundImage: `url(${anime.trailer.images.maximum_image_url})`,
        }}
      >
        <div className="anime-overlay">
          <Container>
            <Row className="align-items-center">
              <Col md={9}>
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
    </div>
  );
};

export default AnimeDetail;
