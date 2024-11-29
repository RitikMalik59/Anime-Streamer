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
  const [episodes, setEpisodes] = useState([]);

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

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/episodes`
        );
        setEpisodes(response.data.data); // Adjust based on API structure
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
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

  // console.log(episodes);

  return (
    <div className="anime-detail bg-black">
      <div
        className="anime-banner"
        style={{
          backgroundImage: `url(${
            anime.trailer.images.maximum_image_url ||
            anime.images.jpg.large_image_url
          })`,
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

      {/* Episodes Section */}
      <Container className="anime-episodes-section mt-4">
        <h2>Episodes</h2>
        {episodes.length > 0 ? (
          <ul className="episode-list">
            {episodes.map((episode) => (
              <li key={episode.mal_id} className="episode-item">
                {anime.images && anime.images.jpg.image_url && (
                  <img
                    src={anime.images.jpg.image_url}
                    alt={`Episode ${episode.mal_id}`}
                    className="episode-image"
                  />
                )}
                <div className="episode-details">
                  <strong>Episode {episode.mal_id}:</strong>{" "}
                  {episode.title || "No Title"}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No episodes available</p>
        )}
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
