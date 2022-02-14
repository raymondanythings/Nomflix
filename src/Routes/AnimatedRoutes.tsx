import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import Tv from "./Tv";

const AnimatedRoutes = () => {
  return (
    <Routes>
      <Route path="/tv" element={<Tv />} />
      <Route path="/search" element={<Search />} />
      <Route path="/" element={<Home />} />
      <Route path="/movies/:movieId" element={<Home />} />
    </Routes>
  );
};

export default AnimatedRoutes;
