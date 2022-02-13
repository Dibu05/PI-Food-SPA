const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios").default;
const { Recipe, DietType } = require("../db");
const router = Router();
const Sequelize = require("sequelize");
const { API_KEY } = process.env;


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//el siguiente paso que me pide es desarrollar el Backend, las rutas, de las cuales me esta pidiendo que haga 4
//Voy a determinar 3 constantes, 1 con los datos de la api, 2 con los datos de la base de datos y 3 una que los concatene a ambos

//lo primero que hago es crear una constante que me traiga todos los datos de la api
const getApiInfo = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    //le indico que me traiga los datos de la URL de la api
    const apiInfo = await apiUrl.data.results.map((info) => {
      //declaro una constante que me traiga la info que yo le solicito
      return {
        //solamente le pido que me traiga estos, mas las dietas
        id: info.id,
        name: info.title,
        resume: info.summary,
        score: info.spoonacularScore,
        healthylevel: info.healthScore,
        stepByStep: info.analyzedInstructions.map((obj) =>
          obj.steps.map((obj2) => obj2.step)
        ),
        image: info.image,
        diets: info.diets.map((diet) => diet),
        //aca pongo todos los datos que yo le pido que me traiga de la api, si quisiera algun otro, lo pongo aqui
      };
    });
    return apiInfo; //le pido que me retorne solo la informacion de la api que le pedi
  } catch (err) {
    console.log(err);
  }
};
//segundo le pido que me traiga todos los datos de la base de datos
const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: DietType,
      atributes: ["name"],
      through: {
        atributes: [],
      },
    },
  });
};
//tercero, concateno a los dos, los datos de la api y la base de datos en uno
const getAllRecipie = async () => {
  const apiInfo = await getApiInfo();
  const dbfInfo = await getDbInfo();
  const allInfo = [...dbfInfo, ...apiInfo];
  return allInfo;
};

//una vez declaradas las constantes de donde saco la informacion, voy a hacer las rutas que me pide

//NO TOCAR ANDA PERFECTA LA RUTA jaja
//hago la primera ruta, que me traiga todas las recetas, las pido por query
router.get("/recipes", async (req, res) => {
  const name = req.query.name;
  try {
    const info = await getAllRecipie();
    if (!name) {
      return res.status(200).json(info);
    } //le pido que me pase la receta que estoy buscando, que las pase todas a minusculas
    const fillInfo = await info.filter((d) =>
      d.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
    //si no encuentro esa informacion que me tire el mensaje de que no hay coincidencia alguna
    fillInfo.length
      ? res.status(200).json(fillInfo)
      : res.status(404).send("There is no coincidence");
  } catch (err) {
    console.log(err);
  }
});

//NO TOCAR RUTA ANDA PERFECTA
//creo una ruta que me traiga los datos del id
//lo que yo quiero es poner el numero de id y que traiga esa sola receta, si no existe que me muestre el msj adecuado
router.get("/recipes/:id", async (req, res) => {
  const id = req.params.id; //la hago utilizando params
  try {
    const allRecipe = await getAllRecipie();
    if (id) {
      const fillRecipe = await allRecipe.filter(
        (element) => element.id.toString() === id
      );
      fillRecipe.length
        ? res.status(200).json(fillRecipe)
        : res.status(404).send("Recipe doesn't exist");
    }
  } catch (err) {
    console.log(err);
  }
});

//NO TOCAR RUTA ANDA PERFECTA jaja
//creo una ruta que me traiga los tipos de dietas que existen o posibles
router.get("/types", async (req, res) => {
  try {
    const allData = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch/?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    //vuelvo a pedir toda la info de la api
    const diet = allData.data.results.map((elemento) => elemento.diets); //traigo todos los datos y le aplico un map
    const diet2 = [];
    diet.map((d2) => {
      for (var i = 0; i < d2.length; i++) {
        diet2.push(d2[i]); //lo pusheo
        //return d2[i];
      }
    });
    diet2.forEach((element) => {
      if (element) {
        DietType.findOrCreate({
          //le pregunto si lo encontro o si lo creo
          where: { name: element },
        });
      }
    });
    const allDiet = await DietType.findAll();
    res.json(allDiet);
  } catch (err) {
    console.log(err);
  }
});

//la ruta del post es para crear una nueva receta
// y por ultimo hago una ruta para crear una nueva receta
router.post("/recipe", async (req, res, next) => {
  try {
    let {
      name,
      score,
      resume,
      stepbystep,
      healthylevel,
      image,
      //createdInDb,
      diets,
    } = req.body; //recolecto todos los datos del body

    let newRecipe = await Recipe.create({
      name,
      score,
      resume,
      stepbystep,
      healthylevel,
      image,
      //createdInDb
    }); //los creo en la base de datos

    let dietDb = await DietType.findAll({
      //busco todos los tipos de dietas que existen en la base de datos
      where: {
        name: diets,
      },
    });
    //ahora le pido que me traiga todos los tipos de dietas que existen en la base de datos
    newRecipe.addDietType(dietDb);
    res.status(200).send("Receta creada con exito");
  } catch (e) {
    next(e);
  }
});

//todo el back funciona perfectamente no hay que tocar nada mas ni modificar nada, el post tmb anda, se pueden crear recetas
//desde aca.
module.exports = router;
