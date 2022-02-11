import axios from "axios";

//Vamos a ir creando mi archivo de acciones

//Con esta funcion me traigo las recetas desde el servidor osea el backend y genero la coneccion del front con el back
export function getAllRecipes() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3001/recipes");
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}

//vamos a hacer la ruta que me traiga la informacion para poder hacer la barra de busqueda
//de esta manera puedo crear el search name
export function getNameRecipe(payload) {
  //yo pongo payload porque es lo que le estoy pasando aca, si fuera name, le paso name
  return async function (dispatch) {
    try {
      //tengo que traerme la ruta del back para que esto quede concatenado, tengo que siempre agregarle el payload
      let json = await axios.get(
        "http://localhost:3001/recipes?name=" + payload
      );
      return dispatch({
        type: "GET_NAME_RECIPE",
        payload: json.data,
      }); //es lo que devuelve la ruta una vez que le asigno algo por name
    } catch (e) {
      console.log(e);
    }
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    let json = await axios.post("http://localhost:3001/recipes", payload);
    return dispatch({
      type: "POST_RECIPES",
      payload: json.data,
    });
  };
}

//Hago el filtro por tipo de dieta
//el payload es el value que tomamos del input del filtro
export function setFilterByDietTypes(payload) {
  console.log(payload);
  return {
    type: "SET_FILTER_BY_DIET_TYPES",
    payload,
  };
}

export function getRecipeType() {
  return async function (dispatch) {
    const rType = await axios.get("http://localhost:3001/types");
    return dispatch({
      type: "GET_RECIPE_TYPE",
      payload: rType.data,
    }); //solo me trae el name del tipo de receta
  };
}

//Filtrado por puntaje (score)
export function orderByScore(payload) {
  return {
    type: "ORDER_BY_SCORE",
    payload,
  };
}
