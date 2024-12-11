// src/pages/AnimeDetail.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import "../customCSS/AnimeDetail.css";

const AnimeDetail = () => {
  const { id } = useParams();
  const { theme, toggleTheme } = useTheme();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [episodes, setEpisodes] = useState([]);
  // const [loadingMore, setLoadingMore] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(null); // Track total pages
  // const [hasMoreEpisodes, setHasMoreEpisodes] = useState(true);

  const [episodes, setEpisodes] = useState([]);
  const [currentPage, setCurrentPage] = useState(null); // Start from the last page
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreEpisodes, setHasMoreEpisodes] = useState(true);
  // console.log(theme);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${id}/full`
        );
        setAnime(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
        setError("Failed to load anime details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [id]);

  const fetchTotalPagesAndStart = async () => {
    try {
      // Fetch the first page to determine total pages
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/videos/episodes?page=1`
      );
      const totalPages = response.data.pagination.last_visible_page;

      setCurrentPage(totalPages); // Start fetching from the last page
    } catch (error) {
      console.error("Error fetching total pages:", error);
    }
  };

  const fetchEpisodes = async (page) => {
    setLoadingMore(true);
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/videos/episodes?page=${page}`
      );
      const newEpisodes = response.data.data.reverse();

      setEpisodes((prevEpisodes) => [
        ...prevEpisodes,
        ...newEpisodes, // Reverse episodes on the page to correct order
      ]);

      // Stop if there are no more pages
      if (page <= 1) {
        setHasMoreEpisodes(false);
      }
    } catch (error) {
      console.error("Error fetching episodes:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // On initial render, fetch total pages and start from the last page
  useEffect(() => {
    fetchTotalPagesAndStart();
  }, []);

  // Fetch episodes whenever the currentPage changes
  useEffect(() => {
    if (currentPage) {
      fetchEpisodes(currentPage);
    }
  }, [currentPage]);

  const handleLoadMore = () => {
    if (hasMoreEpisodes && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
    <div className={`anime-detail ${theme}`}>
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
                <Button
                  variant={`outline-${theme === "light" ? "dark" : "light"}`}
                >
                  Add to Watchlist
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Detailed Information Section */}
      <Container className={`anime-info-section mt-4 `}>
        <Row>
          <Col md={6}>
            <h2>Information</h2>
            <p>
              <strong>Status:</strong> {anime.status || "Unknown"}
            </p>
            <p>
              <strong>Episodes:</strong> {anime.episodes || "Ongoing"}
            </p>
            <p>
              <strong>Rating:</strong> {anime.rating}
            </p>
            <p>
              <strong>Score:</strong> {anime.score}
            </p>
            <p>
              <strong>Season:</strong>{" "}
              {anime.season + ", " + anime.year || "N/A"}
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
              <strong>Rank:</strong> {anime.rank}
            </p>
            <p>
              <strong>Popularity:</strong> {anime.popularity}
            </p>
            <p>
              <strong>Producers:</strong>{" "}
              {anime.producers.length > 0
                ? anime.producers.map((prod) => prod.name).join(", ")
                : "N/A"}
            </p>
          </Col>
        </Row>
      </Container>

      {/* Episodes Section */}
      <Container className={`anime-episodes-section mt-4 `}>
        <h2>Episodes</h2>
        {episodes.length > 0 ? (
          <ul className="episode-list">
            {episodes.map((episode) => (
              <li key={episode.mal_id} className="episode-item">
                {anime.images && anime.images.jpg.image_url && (
                  <img
                    src={
                      episode.images.jpg.image_url || anime.images.jpg.image_url
                    }
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

        {hasMoreEpisodes && (
          <div className="text-center mt-4">
            {loadingMore ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <Button onClick={handleLoadMore} variant="primary">
                Load More Episodes
              </Button>
            )}
          </div>
        )}
        {!hasMoreEpisodes && episodes.length > 0 && (
          <p className="text-center text-muted">All episodes loaded.</p>
        )}
      </Container>

      {/* Trailer Section */}
      <Container className={`anime-trailer-section mt-5 `}>
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
