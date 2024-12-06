// src/pages/GenreListing.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Banner from "../components/Banner";
import AnimeCard from "../components/AnimeCard";

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
    <>
      <Banner />
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Anime under {genreName}</h2>
          {/* <Button variant="primary">View All</Button> */}
        </div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {animeList.map((anime) => (
              <Col key={anime.mal_id}>
                <AnimeCard anime={anime} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default GenreListing;
