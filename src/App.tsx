import React from "react";
import { Routes, Route } from "react-router-dom";

import "./scss/app.scss";

import Home from "./pages/Home.tsx";
import Locations from "./pages/Locations.tsx";
import Episodes from "./pages/Episodes.tsx";

import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import CharacterPage from "./pages/CharacterPage";
import LocationPage from "./pages/LocationPage.tsx";
import EpisodePage from "./pages/EpisodePage.tsx";

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
