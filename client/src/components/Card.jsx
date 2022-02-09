import React from "react";  

//exporto lo que necesito mostrar
export default function Card({image,name,diet}) {
    return (
        <div>
            <h4>{name}</h4>
            <img src={image} alt='Imagen no encontrada' width='100px' height='100px'/>
            <h5>{diet? diet : <h5>Withouth categories</h5>}</h5>
            <div>
                <h5>Show Recipe!</h5>
            </div>
        </div>
    )
}
