const { API_KEY } = process.env;
const axios = require("axios");
const { Recipe, DietType } = require("../db");


const api = async () => {
  try {
    const info = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );

    const apiInfo = info.data.results.map((e) => {
      return {
        name: e.title,
        resume: e.summary,
        score: e.spoonacularScore,
        healthylevel: e.healthScore,
        stepByStep: e.analyzedInstructions.map((obj) =>
          obj.steps.map((obj2) => obj2.step)
        ),
        image: e.image,
        id: e.id,
        diets: e.diets.map((diet) => diet),
      };
    });
    return apiInfo;
  } catch (e) {
      console.log(e)
  }
};

const db = async () =>{
    try {
        return await Recipe.findAll({
            includes:{
                model:DietType,
                atributes:['name'],
                throught:{
                    atributes:[]
                }
            }
        })
    } catch (e) {
        console.log(e)
    }
}

const allInfo = async () => {
    const apiInfo = await api();
    const dbInfo = await db();
    const info = [...dbInfo,...apiInfo]
    return info;
}

module.exports = {
    allInfo
}