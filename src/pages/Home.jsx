// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import Banner from "../components/Banner";
import AnimeCard from "../components/AnimeCard";
import ViewAllButton from "../components/ViewAllButton";
import { useNavigate } from "react-router-dom";

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
      {/* Banner Component*/}
      <Banner />
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Trending Anime</h2>
          {/* <Button variant="primary" onClick={handleViewAll}>
            View All
          </Button> */}
          <ViewAllButton listingType="trending" />
          <ViewAllButton listingType="popular" />
          <ViewAllButton listingType="ongoing" />
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
            {trendingAnime.slice(0, 10).map((anime, index) => (
              <SwiperSlide key={anime.mal_id} virtualIndex={index}>
                <AnimeCard anime={anime} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </div>
  );
};

export default Home;
