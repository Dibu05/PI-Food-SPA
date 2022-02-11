import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getRecipeType } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function RecipeCreate() {

  const dispatch = useDispatch();

  const types = useSelector((state) => state.recipeTypes); //me traigo las recetas usando el useSelector, trayendo el estado

  const [input, setInput] = useState({
    name: "",
    score: "",
    healthylevel: "",
    resume: "",
    stepbystep: "",
    image: "",
    diets: [], //todo esto es lo que me pide el readme
  }); // diets es un arreglo para poder meterle mas de uno

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    dispatch(getRecipeType());
  }, [dispatch]);

  return (
    <div>
        <Link to='/home'><button>Volver</button></Link>
        <h1>Crea tu Nueva Receta</h1>

      <form>
        <label>Nombre:</label>
        <input
          type="text"
          value={input.name}
          name="name"
          onChange={(e) => handleChange(e)}
        />

        <label>Resumen del Plato:</label>
        <input
          type="text"
          value={input.resume}
          name="resume"
          onChange={(e) => handleChange(e)}
        />

        <label>Puntuacion:</label>
        <input
          type="text"
          value={input.score}
          name="score"
          onChange={(e) => handleChange(e)}
        />

        <label>Nivel de "comida saludable":</label>
        <input
          type="text"
          value={input.healthylevel}
          name="healthylevel"
          onChange={(e) => handleChange(e)}
        />

        <label>Paso a Paso:</label>
        <input
          type="text"
          value={input.stepbystep}
          name="stepbystep"
          onChange={(e) => handleChange(e)}
        />
      </form>
    </div>
  );
}
