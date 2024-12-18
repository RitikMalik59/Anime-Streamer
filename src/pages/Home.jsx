// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner";
import AnimeSlider from "../components/AnimeSlider";

const Home = () => {
  const [showOngoing, setShowOngoing] = useState(false);
  const [showTrending, setShowTrending] = useState(false);
  const [showPopular, setShowPopular] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);

  useEffect(() => {
    // Staggered mounting with timeouts
    setTimeout(() => setShowOngoing(true), 1000); // 1 Immediately
    setTimeout(() => setShowTrending(true), 2000); // After 2 second
    setTimeout(() => setShowPopular(true), 3000); // After 3 seconds
    setTimeout(() => setShowUpcoming(true), 5000); // After 5 seconds
  }, []);

  return (
    <>
      {/* Banner Component*/}
      <Banner />
      {/* Conditionally render sliders */}
      {showOngoing && (
        <AnimeSlider categoryURL="seasons/now" animeTitle="Ongoing Anime" />
      )}
      {showTrending && (
        <AnimeSlider categoryURL="top/anime" animeTitle="Trending Anime" />
      )}
      {showPopular && (
        <AnimeSlider categoryURL="anime" animeTitle="Popular Anime" />
      )}
      {showUpcoming && (
        <AnimeSlider
          categoryURL="seasons/upcoming"
          animeTitle="Upcoming Anime"
        />
      )}

      {/* <AnimeSlider categoryURL="seasons/now" animeTitle="Ongoing Anime" />
      <AnimeSlider categoryURL="top/anime" animeTitle="Trending Anime" />
      <AnimeSlider categoryURL="anime" animeTitle="Popular Anime" />
      <AnimeSlider categoryURL="seasons/upcoming" animeTitle="Upcoming Anime" /> */}
    </>
  );
};

export default Home;
