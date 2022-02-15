import React, { useState } from "react";
import { getNameRecipe } from "../actions";
import { useDispatch } from "react-redux";
import '../estilos/SearchBar.css';

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
        className="Buscador"
        type="text"
        placeholder="Busca tu receta"
        onChange={(e) => handleInputChange(e)}
      />
      <button className="btn1" type="submit" onClick={(e) => handleSubmit(e)}>
        Buscar
      </button>
    </div>
  );
}
