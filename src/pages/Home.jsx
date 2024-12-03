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
import config from "../config";
import AnimeSlider from "../components/AnimeSlider";

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
    <>
      {/* Banner Component*/}
      <Banner />
      <AnimeSlider categoryURL="seasons/now" animeTitle="Ongoing Anime" />
      <AnimeSlider categoryURL="top/anime" animeTitle="Trending Anime" />
      <AnimeSlider categoryURL="anime" animeTitle="Popular Anime" />
      <AnimeSlider categoryURL="seasons/upcoming" animeTitle="Upcoming Anime" />
    </>
  );
};

export default Home;
