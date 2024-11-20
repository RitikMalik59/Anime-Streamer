// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Banner from "../components/Banner";
import AnimeCard from "../components/AnimeCard";

const Home = () => {
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch trending anime from Jikan API
    const fetchTrendingAnime = async () => {
      try {
        const response = await axios.get("https://api.jikan.moe/v4/top/anime");
        setTrendingAnime(response.data.data);
      } catch (error) {
        console.error("Error fetching trending anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingAnime();
  }, []);

  return (
    <div>
      <Banner />
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Trending Anime</h2>
          <Button variant="primary">View All</Button>
        </div>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {trendingAnime.map((anime) => (
              <Col key={anime.mal_id}>
                <AnimeCard anime={anime} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Home;
