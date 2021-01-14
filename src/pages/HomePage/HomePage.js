import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import List from "../../components/List";

const HomePage = () => {
  // Set pokemonList state and declare it as an empty array
  const [pokemonList, setPokemonList] = useState([]);
  // Set search state and declare it as an empty string
  const [search, setSearch] = useState("");
  // Set filteredPokemonList state and declare it as an empty array
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  // Initialize pokemonTypes and declare it as an array with the 15 types of pokemon
  const pokemonTypes = [
    "Bug",
    "Dragon",
    "Electric",
    "Fighting",
    "Fire",
    "Flying",
    "Ghost",
    "Grass",
    "Ground",
    "Ice",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Water",
  ];
  // Set state for type checkboxes by using reduce on the pokemonTypes array to turn each type into an object with the type name for the key and false for the value
  const [typeChecked, setTypeChecked] = useState(
    pokemonTypes.reduce(
      (types, acc) => ({
        ...types,
        [acc]: false,
      }),
      {}
    )
  );
  // Set state for weaknesses checkboxes by using reduce on the pokemonTypes array to turn each weaknesses into an object with the weaknesses name for the key and false for the value
  const [weaknessesChecked, setWeaknessesChecked] = useState(
    pokemonTypes.reduce(
      (types, acc) => ({
        ...types,
        [acc]: false,
      }),
      {}
    )
  );

  // Function to fetch list of pokemon & set the pokemonList state to the response data
  const fetchPokemon = async () => {
    const res = await axios.get(
      "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
    );
    setPokemonList(res.data.pokemon);
  };

  // Function to display search results
  const searchPokemonHandler = (e) => {
    // Prevent default submission behavior (page reload)
    e.preventDefault();

    // Declare a searchResult variable and assign it to the result of the find method
    const searchResult = pokemonList.find(
      (pokemon) => pokemon.name.toLowerCase() === search.toLowerCase()
    );

    // If a result was found update the list to only include the result, else re-populate pokemon list
    if (searchResult) {
      setPokemonList([searchResult]);
    } else {
      fetchPokemon();
    }
  };

  // Function to reset search
  const searchResetHandler = () => {
    // Clear search field
    setSearch("");
    // Re-populate list of pokemon
    fetchPokemon();
  };

  // Function to filter pokemon
  const filterPokemonHandler = (e) => {
    // Prevent default submission behavior (page reload)
    e.preventDefault();

    // Initialize a variable to store the types that are true from the typeChecked state
    const typeFilters = [];
    // Loop over the properties in the typeChecked state and add the types that evaluate to true to the typeFilters array
    for (const type in typeChecked) {
      if (typeChecked[type] === true) {
        typeFilters.push(type);
      }
    }
    // Initialize a variable to store the weaknessess that are true from the weaknessesChecked state
    const weaknessesFilters = [];
    // Loop over the properties in the weaknessesChecked state and add the weaknessess that evaluate to true to the weaknessesFilters array
    for (const weaknesses in weaknessesChecked) {
      if (weaknessesChecked[weaknesses] === true) {
        weaknessesFilters.push(weaknesses);
      }
    }

    // Check that filters exist
    if (typeFilters.length || weaknessesFilters.length) {
      // Function to compare 2 arrays for the same content
      const isSame = (arr1, arr2) =>
        arr1.length === arr2.length &&
        arr1.every((value, idx) => value === arr2[idx]);

      // Filter the pokemonList to return any pokemon whose types/weaknesses meet the filter requirements
      const filterResults = pokemonList.filter((pokemon) => {
        let res;
        if (typeFilters.length && weaknessesFilters.length) {
          res =
            (isSame(pokemon.type.sort(), typeFilters.sort()),
            isSame(pokemon.weaknesses.sort(), weaknessesFilters.sort()));
        } else if (typeFilters.length && !weaknessesFilters.length) {
          res = isSame(pokemon.type.sort(), typeFilters.sort());
        } else if (!typeFilters.length && weaknessesFilters.length) {
          res = isSame(pokemon.weaknesses.sort(), weaknessesFilters.sort());
        }
        return res;
      });

      // Update list to show filter results if any exist
      if (filterResults.length) {
        setFilteredPokemonList(filterResults);
      } else {
        fetchPokemon();
      }
    } else {
      setFilteredPokemonList([]);
    }
  };

  // Function to handle type filter checkbox changes
  const typeCheckboxHandler = (e) => {
    // Set typeChecked state to maintain all of it's current values except where the key is equal to e.target.name, in which case it will toggle the value
    setTypeChecked({
      ...typeChecked,
      [e.target.name]: !typeChecked[e.target.name],
    });
  };

  // Function to handle type filter checkbox changes
  const weaknessesCheckboxHandler = (e) => {
    // Set typeChecked state to maintain all of it's current values except where the key is equal to e.target.name, in which case it will toggle the value
    setWeaknessesChecked({
      ...weaknessesChecked,
      [e.target.name]: !weaknessesChecked[e.target.name],
    });
  };

  // If the pokemonList state is an empty array, run the fetchPokemon function
  useEffect(() => {
    if (!pokemonList.length) {
      fetchPokemon();
    }
  }, [pokemonList]);
  return (
    <>
      <h3>Search by Pokemon Name</h3>
      <Form onSubmit={searchPokemonHandler}>
        <Row>
          <Col>
            <Form.Group controlId="formSearch">
              <Form.Label>Pokemon Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Pokemon Name..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </Form.Group>
          </Col>

          <Button variant="primary" type="submit">
            Search
          </Button>

          <Button variant="primary" type="button" onClick={searchResetHandler}>
            Reset
          </Button>
        </Row>
      </Form>

      <Row>
        <Col>
          <h3>Filter Pokemon Type</h3>
          <Form onSubmit={filterPokemonHandler}>
            <Form.Group controlId="formTypeFilterCheckbox">
              <Form.Label>Type: </Form.Label>
              {pokemonTypes.map((type, idx) => (
                <Form.Check
                  key={idx}
                  type="checkbox"
                  label={type}
                  name={type}
                  checked={typeChecked[type]}
                  onChange={typeCheckboxHandler}
                />
              ))}
            </Form.Group>
            <Button variant="primary" type="submit">
              Apply Filter
            </Button>
          </Form>
        </Col>
        <Col>
          <h3>Filter Pokemon Weaknesses</h3>
          <Form onSubmit={filterPokemonHandler}>
            <Form.Group controlId="formWeaknessesFilterCheckbox">
              <Form.Label>Weaknesses: </Form.Label>
              {pokemonTypes.map((type, idx) => (
                <Form.Check
                  key={idx}
                  type="checkbox"
                  label={type}
                  name={type}
                  checked={weaknessesChecked[type]}
                  onChange={weaknessesCheckboxHandler}
                />
              ))}
            </Form.Group>
            <Button variant="primary" type="submit">
              Apply Filter
            </Button>
          </Form>
        </Col>
      </Row>
      <h1>Pokedex</h1>
      <List
        pokemonList={
          filteredPokemonList.length ? filteredPokemonList : pokemonList
        }
      />
    </>
  );
};

export default HomePage;
