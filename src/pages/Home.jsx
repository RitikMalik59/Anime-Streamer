// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Banner from "../components/Banner";
import AnimeSlider from "../components/AnimeSlider";

const Home = () => {
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
