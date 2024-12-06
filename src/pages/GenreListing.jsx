// src/pages/GenreListing.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const GenreListing = () => {
  const { genreId, genreName } = useParams(); // Capture genreId and genreName from route
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedData = localStorage.getItem(`genre_${genreId}`);
    if (cachedData) {
      setAnimeList(JSON.parse(cachedData));
      setLoading(false);
    } else {
      fetchAnimeByGenre();
    }
  }, [genreId]);

  const fetchAnimeByGenre = async () => {
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?genres=${genreId}&order_by=popularity`
      );
      setAnimeList(response.data.data);
      console.log("before");
      localStorage.setItem(
        `genre_${genreId}`,
        JSON.stringify(response.data.data)
      );
      console.log("after");
    } catch (err) {
      console.error("Error fetching anime:", err);
    }
  };

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
      <h1 className="mb-4">Anime under {genreName}</h1>
      <Row>
        {animeList.map((anime) => (
          <Col md={3} sm={6} xs={12} key={anime.mal_id} className="mb-4">
            <div className="anime-card">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="img-fluid rounded"
              />
              <h5 className="mt-2">{anime.title}</h5>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GenreListing;
