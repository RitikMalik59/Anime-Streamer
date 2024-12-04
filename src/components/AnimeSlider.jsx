// src/pages/Home.jsx
import React, { memo, useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import AnimeCard from "../components/AnimeCard";
import ViewAllButton from "../components/ViewAllButton";
import config from "../config";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const AnimeSlider = ({ categoryURL, animeTitle }) => {
  const [animeCategory, setAnimeCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const limit = 10;
  console.log(categoryURL);

  useEffect(() => {
    // Fetch trending anime from Jikan API
    const fetchAnimeCategory = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}${categoryURL}?limit=${limit}`
        );
        setAnimeCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching trending anime:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeCategory();
  }, []);

  return (
    <>
      <Container className="my-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{animeTitle}</h2>
          {/* <Button variant="primary">View All</Button> */}
          <ViewAllButton listingType={categoryURL} />
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
            {animeCategory.map((anime, index) => (
              <SwiperSlide key={index} virtualIndex={index}>
                <AnimeCard anime={anime} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </>
  );
};

export default memo(AnimeSlider);
