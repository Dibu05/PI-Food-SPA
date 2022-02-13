//creo el estado inicial
const initialState = {
  recipes: [],
  allRecipes: [],
  recipeTypes: [],
  detail: [],
};

//1
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      }; //hago el primer filtro que es el ascendente y descendente en este caso el score
    case "ORDER_BY_SCORE":
      let orderArray =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.score > b.score) {
                return 1;
              }
              if (b.score > a.score) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.score > b.score) {
                return -1;
              }
              if (b.score > a.score) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: orderArray,
      };
    //hacemos la logica del segundo filtro que es la que ordena a las recetas por orden alfabetico
    case "ORDER_BY_ALPHA":
      let alphaArr =
        action.payload === "A-Z"
          ? state.allRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.allRecipes.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (a.name.toLowerCase() < b.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: alphaArr,
      };
    //hago el ultimo filtro que es el que me hago por tipo de dieta
    case "FILTER_BY_DIET_TYPES":
      const allRecipes = state.allRecipes;
      const dietsAPI = []; //traigo los datos de la api
      const dietsDB = []; //los de la base de datos
      allRecipes.forEach((e) => {
        if (e.hasOwnProperty("diets") && e.diets.includes(action.payload)) {
          dietsAPI.push(e);
        }
      });

      allRecipes.forEach((e) => {
        if (
          e.hasOwnProperty("DietTypes") &&
          e.DietTypes.map((c) => c.name === action.payload)
        ) {
          dietsDB.push(e);
        }
      });
      const find = dietsAPI.concat(dietsDB); //concateno los dos
      if (find.length) {
        return {
          ...state,
          recipes: find,
        };
      }
      break;

    //creo el caso del search bar, una vez hecha la accion
    //el search bar no es mas que un filtrado mas que ya hicimos en el back
    case "GET_NAME_RECIPE":
      return {
        //devolveme como siempre el estado
        ...state,
        recipes: action.payload, //y las recetas
      }; //en recipes porque es el arreglo que estoy renderizando
    //ahora tengo que pasarlo al reducer, primero el get type
    case "GET_RECIPE_TYPE":
      return {
        ...state,
        recipeTypes: action.payload,
      };
    //siempre necesito ponerlos en el reducer, tiene que estar, tmb le paso el post
    case "POST_RECIPE":
      return {
        ...state,
      };
    //y este es el ultimo caso que necesito hacer que es por el detalle
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    //este es el ultimo
    default:
      return state;
  }
}

export default rootReducer;
