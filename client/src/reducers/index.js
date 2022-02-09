const initialState = {
  recipes: [],
  allRecipes: [],
};

function rootReducer(state = initialState, action) {
  switch (action.payload) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
      default: return state
  }//hago el primer filtro que es el ascendente y descendente en este caso el score
    
}

export default rootReducer;
