import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postRecipe, getRecipeType } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";


function RecipeCreate() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.recipeTypes); //me traigo las recetas usando el useSelector, trayendo el estado
  //el history y history.push, es basicamente lo que hace para redirigirme a la ruta que yo le diga
  //me creo una constante para poder hacer la validacion
  const [err, setErr] = useState({}); //va a ser un objeto vacio
  //al bloquear el boton, hay campos que son requeridos y si no se llenan no te deja
  //crear la receta
  //tambien para poder bloquear el boton
  const [btnSend, setBtnSend] = useState(false);
  //la validacion tmb se haria desde el back, es mas correcto hacerlo de los dos lados y que no se rompa
  //y por fuera de todo lo que vine haciendo voy a crear la validacion del formulario
  /****control de errores */
  function validar(input) {
    let err = {};
    if (!input.name) {
      err.name = "Debe ingresar un nombre";
      setBtnSend(false);
    } else if (!input.resume) {
      err.resume = "Debe ingresar un resumen del plato";
      setBtnSend(false);
    } else {
      setBtnSend(true);
    }
    return err;
  } //tengo que renderizar el formulario y poder guardarlo en un estado
  const [input, setInput] = useState({
    //yo al objeto le paso lo que necesita el post
    name: "",
    score: "",
    healthylevel: "",
    resume: "",
    stepbystep: "",
    image: "",
    diets: [], //todo esto es lo que me pide el readme
  }); // diets es un arreglo para poder meterle mas de uno
  //vamos a empezar a aplicar logicas
  //cada vez que yo cambie mis input no se vayan cambiando
  //quiero ir guardando lo que el usuario va a ir escribiendo
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErr(
      validar({
        //esto es para controlar el formulario
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  //cada vez que ejecutes esta funcion, ademas de lo que tiene agregale lo que se va modificando
  //se lo paso a los input, solo los que hay que escribir

  //como este se porta de forma distinta tengo que usar otra funcion

  function handleSelect(e) {
    setInput({
      ...input,
      diets: [...input.diets, e.target.value],
    });
  }
  //es la que se utiliza para los tipos de dieta
  //traeme lo que ya habia y concatenale lo que yo te estoy seleccionando ahora
  //hago como una lista

  //por ultimo me falta el submit
  function handleSubmit(e) {
    e.preventDefault();
    if (!input.diets.length) {
      return alert("Debe ingresar al menos una dieta");
    } else {
      if (!input.image)
        input.image =
          "https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png";
      dispatch(postRecipe(input));
      alert("Recete creada con exito");
      setInput({
        name: "",
        score: "",
        healthylevel: "",
        resume: "",
        stepbystep: "",
        image: "",
        diets: [],
      });
    }
  }
  //esto lo hago para poder renderizarlas
  useEffect(() => {
    dispatch(getRecipeType());
  }, [dispatch]);

  //para poder ir eliminando si tengo ganas, con el botton X u otro hago un handleDelete
  function handleDelete(el) {
    setInput({
      ...input,
      diets: input.diets.filter((t) => t !== el),
    });
  }
  //lo renderizo
  //form es la etiqueta que me deja crear el formulario
  //label es la casilla que me deja ir creando los ingresos
  //dentro del label, en un input, pongo lo que necesito
  return (
    <div>
      <div>
        <h1>Create a New Recipe</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {err.name && <p>{err.name}</p>}
          </div>
          <div>
            <label>Resumen del Plato:</label>
            <input
              type="text"
              value={input.resume}
              name="resume"
              onChange={(e) => handleChange(e)}
            />
            {err.resume && <p>{err.resume}</p>}
          </div>
          <div>
            <label>Puntaje:</label>
            <input
              type="text"
              value={input.score}
              name="score"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Nivel de "comida saludable":</label>
            <input
              type="text"
              value={input.healthylevel}
              name="healthylevel"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Paso a Paso:</label>
            <input
              type="text"
              value={input.stepByStep}
              name="stepByStep"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Imagen:</label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label>Tipo de Dieta:</label>
            <select onChange={(e) => handleSelect(e)} name="diets">
              {
                types.map((t) => (
                  <option value={t.name} key={t.id}>
                    {t.name}
                  </option>
                )) //tengo que acceder al nombre y a su vez renderizarlo
              }
            </select>
            <div>
              <button type="submit" disabled={!btnSend}>
                Crear Receta
              </button>
            </div>
            <Link to="/home">
              <button>Volver</button>
            </Link>
            <ul>{input.diets.map((el) => el + ",")}</ul>
          </div>
          <div>
            <div>
              {input.diets &&
                input.diets.map((el) => (
                  <div>
                    <p>{el}</p>
                    <button onClick={() => handleDelete(el)}>X</button>
                  </div>
                ))}
            </div>
            <div></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RecipeCreate;
