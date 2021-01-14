import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const DetailsPage = ({ match }) => {
  const pokemonID = match.params.id;

  const [pokemonList, setPokemonList] = useState([]);
  const [pokemon, setPokemon] = useState({});
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [weaknesses, setWeaknesses] = useState("");

  const fetchPokemon = async () => {
    setLoading(true);
    const res = await axios.get(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    );

    setPokemonList(res.data.pokemon);
    setLoading(false);
  };

  useEffect(() => {
    if (!pokemonList.length) {
      fetchPokemon();
    } else if (!loading && pokemonList.length) {
      const pokemonItem = pokemonList.filter(
        (item) => item.num.toString() === pokemonID.toString()
      );
      setPokemon(pokemonItem[0]);
      setType(pokemonItem[0].type.join(", "));
      setWeaknesses(pokemonItem[0].weaknesses.join(", "));
      console.log(pokemon);
    }
  }, [pokemonID, pokemonList, loading, pokemon]);

  return loading ? (
    <p>Loading...</p>
  ) : (!loading && pokemon !== {}) || (!loading && pokemon !== undefined) ? (
    <>
      <LinkContainer to="/">
        <Button>Go Home</Button>
      </LinkContainer>
      <Row>
        <Col>
          <h3>
            {pokemon.num} - {pokemon.name}
          </h3>
        </Col>

        <Col>
          <Image rounded src={pokemon.img} />
        </Col>
      </Row>
      <Table responsive>
        <thead>
          <tr>
            <th>Type</th>
            <th>Weaknesses</th>
            <th>Height</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{type}</td>
            <td>{weaknesses}</td>
            <td>{pokemon.height}</td>
            <td>{pokemon.weight}</td>
          </tr>
        </tbody>
      </Table>
      <h3>Evolutions</h3>
      {pokemon.hasOwnProperty("next_evolution") ||
      pokemon.hasOwnProperty("prev_evolution") ? (
        pokemon.hasOwnProperty("next_evolution") ? (
          <Row>
            {pokemon.next_evolution.map((evolution, i) => (
              <LinkContainer to={`/pokemon/${evolution.num}`}>
                <Col key={i}>
                  <Button>
                    {" "}
                    {evolution.num} - {evolution.name}{" "}
                  </Button>
                </Col>
              </LinkContainer>
            ))}
          </Row>
        ) : pokemon.hasOwnProperty("prev_evolution") ? (
          <Row>
            {pokemon.prev_evolution.map((evolution, i) => (
              <LinkContainer to={`/pokemon/${evolution.num}`}>
                <Col key={i}>
                  <Button>
                    {" "}
                    {evolution.num} - {evolution.name}{" "}
                  </Button>
                </Col>
              </LinkContainer>
            ))}
          </Row>
        ) : (
          pokemon.hasOwnProperty("next_evolution") &&
          pokemon.hasOwnProperty("prev_evolution") && (
            <Row>
              {pokemon.next_evolution.map((evolution, i) => (
                <LinkContainer to={`/pokemon/${evolution.num}`}>
                  <Col key={i}>
                    <Button>
                      {" "}
                      {evolution.num} - {evolution.name}{" "}
                    </Button>
                  </Col>
                </LinkContainer>
              ))}
              {pokemon.prev_evolution.map((evolution, i) => (
                <LinkContainer to={`/pokemon/${evolution.num}`}>
                  <Col key={i}>
                    <Button>
                      {" "}
                      {evolution.num} - {evolution.name}{" "}
                    </Button>
                  </Col>
                </LinkContainer>
              ))}
            </Row>
          )
        )
      ) : (
        <p>No Evolutions Found...</p>
      )}
    </>
  ) : (
    <p>No pokemon found...</p>
  );
};

export default DetailsPage;
