import axios from 'axios';

//Vamos a ir creando mi archivo de acciones

//Con esta funcion me traigo las recetas desde el servidor osea el backend y genero la coneccion del front con el back
export function getAllRecipes() {
    return async function (dispatch) { 
        let json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
} 