import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Banner from "../components/Banner";
import AnimeCard from "../components/AnimeCard";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../components/Loader";

const GenreListing = () => {
  const { genreId, genreName } = useParams(); // Capture genreId and genreName from route
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreAnime, setHasMoreAnime] = useState(true); // Track if more anime are available to load

  const fetchAnime = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}&order_by=popularity`
      );
      const newAnime = response.data.data;

      console.log(newAnime);

      // Update the anime list and pagination state
      setAnimeList((prevList) => [...prevList, ...newAnime]);
      setHasMoreAnime(response.data.pagination.has_next_page); // Update if more pages exist
    } catch (err) {
      console.error("Error fetching anime:", err);
      setError("Failed to load anime for this genre.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAnimeWithRetry = async (page, retryCount = 3) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}&order_by=popularity&limit=5`
      );
      // setAnimeList(response.data.data);
      const newAnime = response.data.data;

      // Update the anime list and pagination state
      setAnimeList((prevList) => [...prevList, ...newAnime]);
      setHasMoreAnime(response.data.pagination.has_next_page); // Update if more pages exist
      setLoading(false);
    } catch (err) {
      if (retryCount > 0 && err.response && err.response.status === 429) {
        console.warn("Rate limited. Retrying...");
        setTimeout(() => fetchAnimeWithRetry(retryCount - 1), 3000); // Retry after 3 seconds
      } else {
        console.error("Failed to fetch data:", err);
        setError("Failed to load anime for this genre.");
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMoreAnime = () => {
    // console.log("loading:" + loading);
    // console.log("hasMoreAnime:" + hasMoreAnime);

    if (!loading && hasMoreAnime) {
      setTimeout(() => {
        setCurrentPage((prevPage) => prevPage + 1);
        // console.log(currentPage);
      }, 3000);
    }
  };

  useEffect(() => {
    // Fetch the first page of anime when the genre changes
    setAnimeList([]); // Clear existing anime list for new genre
    setHasMoreAnime(true); // Reset pagination state
    setCurrentPage(1); // Reset page to 1
  }, [genreId]);

  useEffect(() => {
    // Fetch anime whenever the current page changes
    if (currentPage > 0) {
      fetchAnimeWithRetry(currentPage);
      // fetchAnime(currentPage);
      console.log("fetching page:" + currentPage);
    }
  }, [currentPage]);

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // console.log(animeList.length);
  return (
    <>
      <Banner />
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Anime under {genreName}</h2>
        </div>
        <InfiniteScroll
          pageStart={0} // Starts loading from page 0
          loadMore={loadMoreAnime} // Triggered when the user scrolls near the bottom
          hasMore={hasMoreAnime} // Determines if further data should be loaded
          loader={
            <div key={0} className="text-center my-3">
              <Loader />
            </div>
          }
        >
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {animeList.map((anime, index) => (
              <Col key={index}>
                <AnimeCard anime={anime} />
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
        {/* {loading && <Loader />} Show initial loader */}
      </Container>
    </>
  );
};

export default GenreListing;
