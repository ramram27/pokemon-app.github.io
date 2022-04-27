import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Spinner } from "reactstrap";
import Deck from "./components/Deck";
import Pages from "./components/Pages";
import Footer from "./components/Footer";
import pokemon from "./Images/pokemon_logo.png";

function App() {
  const [pokemonData, setPokemonData] = useState({});
  const [page, setPage] = useState("");
  const [q, setQ] = useState("");
  const [searchParam] = useState(["name"]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon`)
      .then((response) => {
        setPokemonData(response.data);
      })
      .catch((err) => console.log("Error getting list", err));
  }, [page]);

  return (
    <>
      <div className="App">
        <h1>
          <img src={pokemon} alt="Pokemon Logo" width="60%" />
        </h1>

        <div className="wrapper">
          <div className="search-wrapper">
            <label htmlFor="search-form">
              <input
                type="search"
                name="search-form"
                id="search-form"
                className="search-input"
                placeholder="Search for..."
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <span className="sr-only">Enter customer Name</span>
            </label>
          </div>
        </div>
        <Container>
          <Row xs="1" sm="2" md="3" lg="4">
            {pokemonData.results ? (
              pokemonData.results.map((pokemon, index) => (
                <Col key={index}>
                  <Deck pokemon={pokemon} />
                </Col>
              ))
            ) : (
              <h2 style={{ margin: "0 auto" }}>
                Loading <Spinner />
              </h2>
            )}
          </Row>
        </Container>
        <Pages pokemonData={pokemonData} setOffset={setPage} />
      </div>
      <Footer />
    </>
  );
}

export default App;
