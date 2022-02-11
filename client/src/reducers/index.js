const initialState = {
  recipes: [],
  allRecipes: [],
  recipeTypes: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case "SET_FILTER_BY_DIET_TYPES":
      const allRecipes = state.allRecipes;
      const dietsAPI = []; //traigo los datos de la api
      const dietsDB = []; //los de la base de datos

      allRecipes.forEach((e) => {
        if (e.hasOwnProperty("diets") && e.diets.includes(action.payload)) {
          // aqui me traigo los datos de la api que tienen el tipo de dieta que selecciono el usuario
          dietsAPI.push(e);
        }
      });

      allRecipes.forEach((e) => {
        if (
          e.hasOwnProperty("DietTypes") &&
          e.DietTypes.map((c) => c.name === action.payload)
        ) {
          // aqui me traigo los datos de la base de datos que tienen el tipo de dieta que selecciono el usuario
          dietsDB.push(e);
        }
      });
      const find = [...dietsAPI, ...dietsDB]; //concateno los dos arreglos para que no se repitan los datos
      if (find.length) {
        return {
          ...state,
          recipes: find,
        };
      }

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
    case "GET_NAME_RECIPE":
      return {
        //devolveme como siempre el estado
        ...state,
        recipes: action.payload, //y las recetas
      };
    case 'POST_RECIPES':
      return {
        ...state,
      }
    case 'GET_RECIPE_TYPE':
      return {
        ...state,
        recipeTypes: action.payload,
      }

    default:
      return state;
  }
}

export default rootReducer;
