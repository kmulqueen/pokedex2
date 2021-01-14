import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ number, name, type, weaknesses }) => {
  return (
    <tr>
      <td>{number}</td>
      <td>{name}</td>
      {/* Check that the type array has content. If the pokemon has multiple types, format the array as a string and separate the contents by a comma */}
      {type.length ? <td>{type.join(", ")}</td> : <td>No Type Found</td>}

      {/* Check that the weaknesses array has content. If the pokemon has multiple weaknesses, format the array as a string and separate the contents by a comma */}
      {weaknesses.length ? (
        <td>{weaknesses.join(", ")}</td>
      ) : (
        <td>No Weaknesses Found</td>
      )}
      <td>
        <Link to={`/pokemon/${number}`}>Details</Link>
      </td>
    </tr>
  );
};

export default ListItem;
