import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import Home from "./pages/Home";
import Locations from "./pages/Locations";
import Episodes from "./pages/Episodes";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CharacterPage from "./pages/CharacterPage";
import LocationPage from "./pages/LocationPage";
import EpisodePage from "./pages/EpisodePage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="/location/:id" element={<LocationPage />} />
        <Route path="/episode/:id" element={<EpisodePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
