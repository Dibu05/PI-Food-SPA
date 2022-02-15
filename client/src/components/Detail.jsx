import React, { useEffect } from "react";
import { getDetail } from "../actions";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import '../estilos/Details.css';

export default function Detail() {
  const {id} = useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDetail(id));
},[dispatch,id]);

const recipe = useSelector((state) => state.detail);

return (
    <div>
            {
   recipe.length > 0 ? 
   <div>                                
     <h1 className="nombrereceta">Detalle de la receta</h1>
     <h2 className="nombrereceta">{recipe[0].name}</h2>
     <div className="img">
     <img className="imgReceta" src={recipe[0].image} alt="" width="300px" height="300px"/>
     </div>
     <p className="resume">Resumen: {recipe[0].resume.replace(/<[^>]*>?/g, '')}</p>
     <h5 className="typeofdiet">Tipo de Dieta: {!recipe[0].createdInDb ? recipe[0].diets?.map((diet) => diet) : recipe[0].DietTypes.map((diet) => diet.name)}</h5>
     <h5 className="score">Puntaje: {recipe[0].score}</h5>
     <h5 className="healthylevel">Nivel de comida saludable: {recipe[0].healthylevel}</h5>
     <p className="steps">Paso a Paso: {!recipe[0].createdInDb ? recipe[0].stepByStep?.map((step) => step) : recipe[0].stepbystep}</p>
     <Link to = '/home'>
     <button className="atras">Volver</button>
     </Link>
    </div> : <h1>Cargando...</h1>
            }
    </div>
)
}

