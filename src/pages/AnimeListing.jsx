// src/pages/AnimeListing.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import Banner from "../components/Banner";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import config from "../config";

const AnimeListing = () => {
  const { listingType, current } = useParams();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimeList = async () => {
      setLoading(true);
      try {
        let endpoint;
        if (listingType && current) endpoint = `${listingType}/${current}`;
        else if (listingType) endpoint = `${listingType}`; // Add filters as needed
        // else if (listingType === "ongoing") endpoint = "/seasons/now";
        // else navigate(`/${listingType}/404`);

        const apiUrl = `${config.API_URL}${endpoint}`;
        console.log(apiUrl);

        const response = await axios.get(apiUrl);
        setAnimeList(response.data.data);
        console.log(animeList);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeList();
  }, [listingType]);

  return (

    <div>
      <Banner />
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{listingType.toUpperCase()} Anime</h2>
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
    </div>
  );
};

export default AnimeListing;
