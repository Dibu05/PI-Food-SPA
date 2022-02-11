import React, { useState } from "react";
import { getNameRecipe } from "../actions";
import { useDispatch } from "react-redux";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);

  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameRecipe(name));
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Busca tu receta"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
