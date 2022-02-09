import React from "react";  

//exporto lo que necesito mostrar
export default function Card({image,name,diet}) {
    return (
        <div>
            <h4>{name}</h4>
            <img src={image} alt='Imagen no encontrada' width='200px' height='250px'/>
            <h5>{diet}</h5>
            <div>
                <h5>Show Recipe!</h5>
            </div>
        </div>
    )
}
