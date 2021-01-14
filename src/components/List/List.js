import React from "react";
import Table from "react-bootstrap/Table";
import ListItem from "../ListItem";

const List = ({ pokemonList }) => {
  // If the pokemonList has content, render the results in the list as a table
  return pokemonList.length ? (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Type</th>
          <th>Weaknesses</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {/* Map through the pokemonList and render a list item for each pokemon */}
        {pokemonList.map((pokemon, idx) => (
          <ListItem
            key={pokemon.id}
            number={pokemon.num}
            name={pokemon.name}
            type={pokemon.type}
            weaknesses={pokemon.weaknesses}
          />
        ))}
      </tbody>
    </Table>
  ) : (
    // If pokemonList is an empty array, return message
    <p>No Pokemon Found.</p>
  );
};

export default List;
