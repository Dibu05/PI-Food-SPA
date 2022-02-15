import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postRecipe, getRecipeType } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import '../estilos/RecipeCreate.css';
function RecipeCreate() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.recipeTypes); //me traigo las recetas usando el useSelector, trayendo el estado
  const Navigate = useNavigate();
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
      err.name = "You must insert a name";
      setBtnSend(false);
    } else if (!input.resume) {
      err.resume = "You must insert a Resume";
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
      return alert("You must insert diet type");
    } else {
      if (!input.image)
        input.image =
          "https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png";
      dispatch(postRecipe(input));
      alert("Recipe created!");
      setInput({
        name: "",
        score: "",
        healthylevel: "",
        resume: "",
        stepbystep: "",
        image: "",
        diets: [],
      });
      Navigate("/home");
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
    <div className="crearReceta">
      <div>
        <h1 className="tittle-form">Crea una nueva Receta!</h1>
        <form className="formulario" onSubmit={(e) => handleSubmit(e)}>
          <div className="form1">
            <label>Nombre:</label>
            <input
              className="casilla1"
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {err.name && <p>{err.name}</p>}

          </div>
          <div className="form4">
            <label>Resumen:</label>
            <input
            className="casilla4"
              type="text"
              value={input.resume}
              name="resume"
              onChange={(e) => handleChange(e)}
            />
            {err.resume && <p>{err.resume}</p>}
          </div>

          <div className="form2">
            <label>Puntaje:</label>
            <input
            className="casilla2"
              type="text"
              value={input.score}
              name="score"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form3">
            <label>Nivel de comida saludable:</label>
            <input
            className="casilla3"
              type="text"
              value={input.healthylevel}
              name="healthylevel"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form5">
            <label>Paso a Paso:</label>
            <input
            className="casilla5"
              type="text"
              value={input.stepbystep}
              name="stepbystep"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="fomr6">
            <label>Imagen:</label>
            <input
            className="casilla6"
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="form7">
            <label>Tipo de Dieta:</label>
            <select className="casilla7" onChange={(e) => handleSelect(e)} name="diets">
              {
                types.map((t) => (
                  <option value={t.name} key={t.id}>
                    {t.name}
                  </option>
                )) //tengo que acceder al nombre y a su vez renderizarlo
              }
            </select>

            <div>
              <button className="crear" type="submit" disabled={!btnSend}>
                Crear receta
              </button>

            </div>
            <Link to="/home">
              <button>Volver</button>
            </Link>
            <ul className="seleccion" >{input.diets.map((el) => el + ",")}</ul>
          </div>
          <div>
            <div className="lista" >
              {input.diets &&
                input.diets.map((el) => (
                  <div key={el.id}>
                    <p>{el}</p>
                    <button className="botonX" onClick={() => handleDelete(el)}>X</button>
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
