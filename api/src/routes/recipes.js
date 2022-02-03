const router = require("express").Router();
const {Recipe, DietType} = require('../db')
const {allInfo} =require('../controllers/Recipe')

router.get('', async (req,res,next) => {
    const {name} = req.query
    try {
        const recipes = await allInfo()
        if (name){
            const filtro = await recipes.filter(e => e.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
            filtro.length ? res.status(200).json(filtro) : res.status(404).send('No hay coincidencia')
        }
    } catch (e) {
        next(e)
    }
})

router.get('/:id', async (req,res,next) =>{
    const {id} = req.params
    try {
        if(id){
            const info = await allInfo()
            const filtro = await info.filter(e => e.id.toString() == id )
            filtro.length ? res.status(200).json(filtro) : res.status(404).send('No existe esa receta')
        }
    } catch (e) {
        next(e)
    }
})

router.post('', async (req, res, next) => {
    try{
       let {
               name, 
               score,
               resume,
               stepByStep,
               healthylevel,
               image,
               diets,
       } = req.body; //recolecto todos los datos del body

       let newRecipe= await Recipe.create({
               name, 
               score,
               resume,
               stepbystep: stepByStep,
               healthylevel,
               image,
       }) //los creo en la base de datos

       let arreglo= Array.isArray(diets) ? diets: [diets];

       let dietDb = await DietType.findAll({
               where:{
                       name:{
                               [Op.in] : arreglo,
                               
                       }
               }
       })
       newRecipe.addDietType(dietDb);
       res.status(200).send("Recipe successfully created!");
     } catch (e) {
               next(e)
       }
})

module.exports= router;