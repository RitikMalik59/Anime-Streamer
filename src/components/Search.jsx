import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AnimeCard from "./AnimeCard";
import Banner from "./Banner";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query"); // Get query from URL

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${query}`
        );
        const animeData = response.data.data || [];

        if (animeData.length === 0) {
          setError(`No results found for "${query}".`);
        } else {
          setResults(animeData);
        }

        setResults(response.data.data);
        // console.log(results);
      } catch (err) {
        setError("Failed to fetch search results. Please try again.");
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (!query)
    return (
      <div className="text-white text-center my-5">
        Please enter a search term.
      </div>
    );

  return (
    <>
      {/* Banner Component*/}
      <Banner />

      <Container className="my-5">
        {/* Loading State */}
        {loading && (
          <Spinner
            animation="border"
            variant="light"
            className="d-block mx-auto"
          />
        )}

        {/* Error State */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Search Results */}

        <Row>
          {results.length > 0 ? (
            <div>
              <Container className="my-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>Searched Anime</h2>
                  {/* <Button variant="primary">View All</Button> */}
                </div>

                {loading ? (
                  <div className="d-flex justify-content-center">
                    <Spinner animation="border" variant="primary" />
                  </div>
                ) : (
                  // <Swiper
                  //   // install Swiper modules
                  //   modules={[Navigation, Scrollbar, A11y]}
                  //   spaceBetween={20}
                  //   slidesPerView={1}
                  //   breakpoints={{
                  //     640: {
                  //       slidesPerView: 2,
                  //       spaceBetween: 20,
                  //     },
                  //     768: {
                  //       slidesPerView: 3,
                  //       spaceBetween: 40,
                  //     },
                  //     1024: {
                  //       slidesPerView: 4,
                  //       spaceBetween: 50,
                  //     },
                  //   }}
                  //   navigation
                  //   pagination={{ clickable: true }}
                  //   scrollbar={{ draggable: true }}
                  //   onSwiper={(swiper) => console.log(swiper)}
                  //   onSlideChange={() => console.log("slide change")}
                  // >
                  //   {results.map((anime, index) => (
                  //     <SwiperSlide key={anime.mal_id} virtualIndex={index}>
                  //       <AnimeCard anime={anime} />
                  //     </SwiperSlide>
                  //   ))}
                  // </Swiper>
                  <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {results.map((anime) => (
                      <Col key={anime.mal_id}>
                        <AnimeCard anime={anime} />
                      </Col>
                    ))}
                  </Row>
                )}
              </Container>
            </div>
          ) : (
            !loading && (
              <p className="text-center text-white">No results found.</p>
            )
          )}
        </Row>
      </Container>
    </>
  );
};

export default Search;
