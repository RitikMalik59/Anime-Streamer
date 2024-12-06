// src/pages/GenreListing.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import "../customCSS/GenreListing.css"; // Import custom styles

const GenreListing = () => {
  const { genreId, genreName } = useParams(); // Capture genreId and genreName from route
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeWithRetry = async (retryCount = 3) => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=popularity`
        );
        setAnimeList(response.data.data);
        setLoading(false);
      } catch (err) {
        if (retryCount > 0 && err.response && err.response.status === 429) {
          console.warn("Rate limited. Retrying...");
          setTimeout(() => fetchAnimeWithRetry(retryCount - 1), 2000); // Retry after 2 seconds
        } else {
          console.error("Failed to fetch data:", err);
          setError("Failed to load anime for this genre.");
          setLoading(false);
        }
      }
    };
    fetchAnimeWithRetry();
  }, [genreId]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4 text-center">Anime under {genreName}</h1>
      <Row>
        {animeList.map((anime) => (
          <Col md={3} sm={6} xs={12} key={anime.mal_id} className="mb-4">
            <div className="anime-card">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="anime-image img-fluid rounded"
              />
              <div className="anime-card-body">
                <h5 className="anime-title">{anime.title}</h5>
                <p className="anime-score">⭐ {anime.score || "N/A"}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GenreListing;
