import React, { useState } from "react";
import AnimeCard from "./AnimeCard";
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
  Form,
  Button,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return; // Prevent empty searches
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${query}`
      );
      setResults(response.data.data);
    } catch (err) {
      setError("Failed to fetch search results. Please try again.");
      console.error("Error fetching search results:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      {/* Search Bar */}
      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="align-items-center">
          <Col xs={9}>
            <Form.Control
              type="text"
              placeholder="Search for an anime..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col xs={3}>
            <Button variant="primary" type="submit" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

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
          //   results.map((anime) => (
          //   <Col key={anime.mal_id} md={4} className="mb-4">
          //     <Card className="h-100 bg-dark text-white">
          //       <Card.Img
          //         variant="top"
          //         src={anime.images.jpg.image_url}
          //         alt={anime.title}
          //       />
          //       <Card.Body>
          //         <Card.Title>{anime.title}</Card.Title>
          //         <Link
          //           to={`/anime/${anime.mal_id}`}
          //           className="btn btn-primary mt-2"
          //         >
          //           View Details
          //         </Link>
          //       </Card.Body>
          //     </Card>
          //   </Col>
          //   <AnimeCard anime={anime} />

          <div>
            {/* <Banner /> */}
            <Container className="my-5">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Searched Anime</h2>
                <Button variant="primary">View All</Button>
              </div>

              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : (
                <Swiper
                  // install Swiper modules
                  modules={[Navigation, Scrollbar, A11y]}
                  spaceBetween={20}
                  slidesPerView={1}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 50,
                    },
                  }}
                  navigation
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                  onSwiper={(swiper) => console.log(swiper)}
                  onSlideChange={() => console.log("slide change")}
                >
                  {results.map((anime, index) => (
                    <SwiperSlide key={anime.mal_id} virtualIndex={index}>
                      <AnimeCard anime={anime} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </Container>
          </div>
        ) : (
          // ))
          !loading && (
            <p className="text-center text-white">No results found.</p>
          )
        )}
      </Row>
    </Container>
  );
};

export default Search;
