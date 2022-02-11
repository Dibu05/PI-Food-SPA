import React from "react";

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumber = [];
  //declaro un arreglo vacio
  //el ceil genera el redondeo, y el bucle for me hace toda la division para que aparezcan por pagina
  for (let i = 0; i < Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumber.push(i + 1);
  } //lo pusheo en mi arreglo de numeros
  //este va a ser el componente que me lo renderice todo
  return (
    <nav>
      <ul>
        {pageNumber &&
          pageNumber.map((number) => (
            <p key= {number} >
              <button onClick={() => paginado(number)}>
                {number}
              </button>
            </p>
          ))}
      </ul>
    </nav>
  );
}
