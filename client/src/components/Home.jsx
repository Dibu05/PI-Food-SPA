import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //uso hooks
import {
  getAllRecipes,
  orderByScore,
  orderByAlphabetics,
  setFilterByDietTypes,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paged from "./Paged";
import SearchBar from "./SearchBar";

export default function Home() {
  //Hago esto para despachar mis acciones al reducer y ultilizarlas en el componente
  const dispatch = useDispatch();

  //tengo que tener en cuenta como tengo escrito el estado asi no cometa error al traermelo
  const allRecipes = useSelector((state) => state.recipes);

  //Creo el paginado
  //guardo en un estado local la pagina actual, y una que me lo setee, por eso es 1
  const [currentPage, setCurrentPage] = useState(1);
  //en otro estado local, cuantos quiero que aparezcan, quiero 9 segun readme
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage; // 9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage; // 0
  const currentRecipes = allRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  //los personajes que van a estar en la pagina actual
  //guarda todas las recetas que tengo por paginas
  //el slice agarra un arreglo y lo va cortando dependiendo lo que yo voy pasandole por parametro
  //y por ultimo creo la constante del paginado
  //esta es la que me va a ayudar al renderizado

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  //creo una constante para el uso de los filtros
  const [order, setOrder] = useState("");

  //vamos a traernos las recetas del estado
  //para eso utilizamos un useEffect
  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]); //lo que se incluye en el arreglo lo que depende el componente de arriba
  //fijarse si va o no lleno el array

  //para que el boton de Refresh all Recipe ande tengo que pasarle un handleClick
  //sino no puede devolverme la accion que le estoy pidiendo
  function handleClick(e) {
    e.preventDefault(); //le paso un evento para que no se rompa
    dispatch(getAllRecipes());
  }

  //Para que el boton de order by typeDiet ande tengo que pasarle un handleClick
  function handdleFilterByDietTypes(e) {
    e.preventDefault();
    dispatch(setFilterByDietTypes(e.target.value));
  }

  function handleOrderByScore(e) {
    e.preventDefault();
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  //Renderizamos la pagina
  return (
    <div>
      <div>
        <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Refresh!
        </button>
        <Link to="/create">
          <button>Crea tu receta</button>
        </Link>
      </div>

      <div>
        <select>
          <option value="all">Orden Alfabetico</option>
          <option value="A-Z">Orden A - Z</option>
          <option value="Z-A">Orden Z - A</option>
        </select>
      </div>

      <div>
        <select onChange={(e) => handleOrderByScore(e)}>
          <option value="all">Orden por Puntaje</option>
          <option value="asc">Mayor Puntaje</option>
          <option value="desc">Bajo Puntaje</option>
        </select>
      </div>

      <div>
        <select onChange={(e) => handdleFilterByDietTypes(e)}>
          <option value="all">Orden por Tipo de Dieta</option>
          <option value="gluten free">Gluten Free</option>
          <option value="dairy free">Dairy Free</option>
          <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="paleolithic">Paleolithic</option>
          <option value="primal">Primal</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="fodmap friendly">FodMap Friendly</option>
          <option value="whole 30">Whole 30</option>
        </select>
      </div>

      <div>
        {currentRecipes.map((e) => {
          return (
            <div key={e.id}>
              <Link to={`/recipes/${e.id}`}>
                <Card
                  image={e.image}
                  name={e.name}
                  diet={
                    e.createdInDb ? e.DietTypes.map((dt) => dt.name) : e.diet
                  }
                />
              </Link>
            </div>
          );
        })}
      </div>

      <div>
        <Paged
          className="paged"
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
