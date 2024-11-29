// src/pages/AnimeListing.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import Banner from "../components/Banner";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";

const AnimeListing = () => {
  const { listingType } = useParams();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  //   console.log("nopage");

  useEffect(() => {
    const fetchAnimeList = async () => {
      setLoading(true);
      try {
        let endpoint;
        if (listingType === "trending") endpoint = "/top/anime";
        else if (listingType === "popular")
          endpoint = "/anime"; // Add filters as needed
        else if (listingType === "ongoing") endpoint = "/seasons/now";
        else navigate(`/${listingType}/404`);

        const response = await axios.get(`https://api.jikan.moe/v4${endpoint}`);
        setAnimeList(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeList();
  }, [listingType]);

  return (
    // <div className="anime-listing-page">
    //   <h1 className="text-light text-center">
    //     {listingType.toUpperCase()} Anime
    //   </h1>
    //   {loading ? (
    //     <p>Loading...</p>
    //   ) : (
    //     <div>
    //       {animeList.map((anime) => (
    //         <AnimeCard anime={anime} />
    //       ))}
    //     </div>
    //   )}
    // </div>

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
